// EAS configuration for Base Sepolia
export const EAS_CONTRACT_ADDRESS = '0x4200000000000000000000000000000000000021';
export const SCHEMA_REGISTRY_ADDRESS = '0x4200000000000000000000000000000000000020';

// Care attestation schema: "address recipient, string category, string description, bool bilateral"
// Schema UID — registered or to be registered on Base Sepolia
// This will be populated after first registration
export const CARE_SCHEMA_STRING = 'address recipient, string category, string description, bool bilateral';

// Known registered schema UID on Base Sepolia (set after registration)
// If empty, use registerCareSchema() to register it first
export const CARE_SCHEMA_UID = process.env.NEXT_PUBLIC_CARE_SCHEMA_UID || '';

export const EAS_GRAPHQL_URL = 'https://base-sepolia.easscan.org/graphql';
export const BASE_SEPOLIA_EXPLORER = 'https://sepolia.basescan.org';

export interface LiveAttestation {
  id: string;
  attester: string;
  recipient: string;
  schema: { id: string };
  decodedDataJson: string;
  time: number;
  txid: string;
  revoked: boolean;
}

export interface ParsedCareAttestation {
  uid: string;
  attester: string;
  recipient: string;
  category: string;
  description: string;
  bilateral: boolean;
  time: number;
  txHash: string;
}

export async function fetchLiveAttestations(schemaId: string, limit = 20): Promise<ParsedCareAttestation[]> {
  if (!schemaId) return [];

  const query = `
    query GetAttestations($schemaId: String!, $take: Int!) {
      attestations(
        where: { schemaId: { equals: $schemaId }, revoked: { equals: false } }
        orderBy: { time: desc }
        take: $take
      ) {
        id
        attester
        recipient
        decodedDataJson
        time
        txid
        revoked
      }
    }
  `;

  try {
    const res = await fetch(EAS_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { schemaId, take: limit } }),
      next: { revalidate: 60 },
    });

    const json = await res.json();
    const attestations: LiveAttestation[] = json?.data?.attestations ?? [];

    return attestations.map((att) => {
      let category = '';
      let description = '';
      let bilateral = false;

      try {
        const decoded = JSON.parse(att.decodedDataJson);
        for (const field of decoded) {
          if (field.name === 'category') category = field.value.value as string;
          if (field.name === 'description') description = field.value.value as string;
          if (field.name === 'bilateral') bilateral = field.value.value as boolean;
        }
      } catch {
        // malformed data — skip
      }

      return {
        uid: att.id,
        attester: att.attester,
        recipient: att.recipient,
        category,
        description,
        bilateral,
        time: att.time,
        txHash: att.txid,
      };
    });
  } catch {
    return [];
  }
}

export async function fetchAttestationsForAddress(
  address: string,
  schemaId: string
): Promise<ParsedCareAttestation[]> {
  if (!schemaId || !address) return [];

  const query = `
    query GetAddressAttestations($schemaId: String!, $address: String!) {
      received: attestations(
        where: {
          schemaId: { equals: $schemaId }
          recipient: { equals: $address }
          revoked: { equals: false }
        }
        orderBy: { time: desc }
      ) {
        id
        attester
        recipient
        decodedDataJson
        time
        txid
        revoked
      }
      given: attestations(
        where: {
          schemaId: { equals: $schemaId }
          attester: { equals: $address }
          revoked: { equals: false }
        }
        orderBy: { time: desc }
      ) {
        id
        attester
        recipient
        decodedDataJson
        time
        txid
        revoked
      }
    }
  `;

  try {
    const res = await fetch(EAS_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { schemaId, address: address.toLowerCase() } }),
      next: { revalidate: 60 },
    });

    const json = await res.json();
    const all = [...(json?.data?.received ?? []), ...(json?.data?.given ?? [])];
    // Deduplicate by id
    const seen = new Set<string>();
    const unique = all.filter((a) => {
      if (seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    });

    return unique.map((att) => {
      let category = '';
      let description = '';
      let bilateral = false;

      try {
        const decoded = JSON.parse(att.decodedDataJson);
        for (const field of decoded) {
          if (field.name === 'category') category = field.value.value as string;
          if (field.name === 'description') description = field.value.value as string;
          if (field.name === 'bilateral') bilateral = field.value.value as boolean;
        }
      } catch {
        // skip
      }

      return {
        uid: att.id,
        attester: att.attester,
        recipient: att.recipient,
        category,
        description,
        bilateral,
        time: att.time,
        txHash: att.txid,
      };
    });
  } catch {
    return [];
  }
}
