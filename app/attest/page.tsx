'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWalletClient } from 'wagmi';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from 'ethers';
import { CATEGORIES, CATEGORY_EMOJI, Category } from '@/lib/mock-data';
import { EAS_CONTRACT_ADDRESS, CARE_SCHEMA_UID, BASE_SEPOLIA_EXPLORER, CARE_SCHEMA_STRING } from '@/lib/eas';

const MAX_CHARS = 280;

export default function AttestPage() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [recipient, setRecipient] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [description, setDescription] = useState('');
  const [bilateral, setBilateral] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const charsLeft = MAX_CHARS - description.length;
  const isValid = isConnected && recipient.length > 0 && category !== '' && description.length >= 10;

  function shortAddress(addr: string) {
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || !walletClient) return;
    setSubmitting(true);
    setError('');

    try {
      // Build an ethers provider from the wagmi wallet client
      const { transport } = walletClient;
      const provider = new ethers.BrowserProvider(transport, {
        name: 'base-sepolia',
        chainId: 84532,
      });
      const signer = await provider.getSigner();

      const eas = new EAS(EAS_CONTRACT_ADDRESS);
      eas.connect(signer);

      // Use the registered schema UID or fall back to zero bytes32 placeholder
      const schemaUID = CARE_SCHEMA_UID || ethers.ZeroHash;

      const schemaEncoder = new SchemaEncoder(CARE_SCHEMA_STRING);
      const encodedData = schemaEncoder.encodeData([
        { name: 'recipient', value: recipient, type: 'address' },
        { name: 'category', value: category, type: 'string' },
        { name: 'description', value: description, type: 'string' },
        { name: 'bilateral', value: bilateral, type: 'bool' },
      ]);

      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient,
          expirationTime: 0n,
          revocable: true,
          data: encodedData,
        },
      });

      // Capture the tx hash from the underlying ethers transaction
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ethTx = (tx as any).tx ?? (tx as any).transaction ?? (tx as any);
      const hash = ethTx?.hash ?? '';
      await tx.wait();
      setTxHash(hash);
      setSubmitted(true);
    } catch (err: unknown) {
      console.error('Attestation error:', err);
      const message = err instanceof Error ? err.message : 'Transaction failed. Please try again.';
      setError(message.slice(0, 200));
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>❤️‍🔥</div>
        <h1 style={{
          fontFamily: 'DM Serif Display, Georgia, serif',
          fontSize: '36px',
          color: 'var(--text-primary)',
          marginBottom: '16px',
        }}>
          Attestation submitted
        </h1>
        <p style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: '17px',
          color: 'var(--text-secondary)',
          lineHeight: '1.65',
          marginBottom: '24px',
        }}>
          Your care attestation has been recorded on Base Sepolia. It&apos;s permanent, public, and proof that care happened.
        </p>
        {txHash && (
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(6, 214, 160, 0.08)',
            border: '1px solid rgba(6, 214, 160, 0.2)',
            marginBottom: '24px',
            wordBreak: 'break-all',
          }}>
            <div style={{ fontFamily: 'Nunito', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Transaction Hash
            </div>
            <a
              href={`${BASE_SEPOLIA_EXPLORER}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: 'var(--orange-primary)',
                textDecoration: 'none',
              }}
            >
              {txHash}
            </a>
            <div style={{ marginTop: '8px' }}>
              <a
                href={`${BASE_SEPOLIA_EXPLORER}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'Nunito',
                  fontSize: '13px',
                  color: 'var(--orange-primary)',
                  textDecoration: 'none',
                }}
              >
                View on Base Sepolia Explorer ↗
              </a>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/explore" className="btn-primary">
            Browse Attestations
          </Link>
          <button
            onClick={() => { setSubmitted(false); setRecipient(''); setCategory(''); setDescription(''); setTxHash(''); }}
            className="btn-secondary"
          >
            Attest Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '48px 0 80px' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <Link href="/" style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '14px',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '20px',
          }}>
            ← Back
          </Link>
          <h1 style={{
            fontFamily: 'DM Serif Display, Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 40px)',
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}>
            Attest care work
          </h1>
          <p style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: '16px',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            margin: 0,
          }}>
            Record someone&apos;s care on Base Sepolia. Takes 2 minutes. Costs pennies in ETH.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Wallet Connect */}
            <div className="card" style={{ padding: '24px' }}>
              <label style={{
                display: 'block',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '12px',
              }}>
                Your Wallet
              </label>

              {isConnected && address ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'rgba(6, 214, 160, 0.08)',
                    borderRadius: '12px',
                    border: '1px solid rgba(6, 214, 160, 0.2)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #F47D31, #FFD166)',
                      }} />
                      <div>
                        <div style={{ fontFamily: 'monospace', fontSize: '14px', color: 'var(--text-primary)' }}>
                          {shortAddress(address)}
                        </div>
                        <div style={{ fontFamily: 'Nunito', fontSize: '12px', color: '#06D6A0' }}>
                          Connected · Base Sepolia
                        </div>
                      </div>
                    </div>
                    <div>
                      <ConnectButton chainStatus="none" showBalance={false} accountStatus="address" />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: '1.5',
                  }}>
                    Connect your wallet to sign this attestation on Base Sepolia. Your address becomes the &quot;attester&quot; on-chain.
                  </p>
                  <div style={{ alignSelf: 'flex-start' }}>
                    <ConnectButton label="🔗 Connect Wallet" />
                  </div>
                </div>
              )}
            </div>

            {/* Recipient */}
            <div className="card" style={{ padding: '24px' }}>
              <label htmlFor="recipient" style={{
                display: 'block',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '8px',
              }}>
                Who are you attesting? *
              </label>
              <p style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '13px',
                color: 'var(--text-muted)',
                marginBottom: '12px',
              }}>
                The Ethereum address of the person who provided care.
              </p>
              <input
                id="recipient"
                type="text"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                placeholder="0x..."
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid var(--warm-gray)',
                  background: 'var(--bg-base)',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'border-color 200ms ease',
                  boxSizing: 'border-box',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--orange-primary)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--warm-gray)'; }}
              />
            </div>

            {/* Category */}
            <div className="card" style={{ padding: '24px' }}>
              <label style={{
                display: 'block',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '12px',
              }}>
                Category *
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '8px',
              }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: `2px solid ${category === cat ? 'var(--orange-primary)' : 'var(--warm-gray)'}`,
                      background: category === cat ? 'var(--orange-ultralight)' : 'transparent',
                      fontFamily: 'Nunito, sans-serif',
                      fontSize: '14px',
                      fontWeight: category === cat ? 700 : 500,
                      color: category === cat ? 'var(--orange-primary)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 150ms ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {CATEGORY_EMOJI[cat]} {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="card" style={{ padding: '24px' }}>
              <label htmlFor="description" style={{
                display: 'block',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '8px',
              }}>
                Description *
              </label>
              <p style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '13px',
                color: 'var(--text-muted)',
                marginBottom: '12px',
              }}>
                What did they do? Be specific. This goes on-chain forever.
              </p>
              <textarea
                id="description"
                value={description}
                onChange={e => {
                  if (e.target.value.length <= MAX_CHARS) setDescription(e.target.value);
                }}
                placeholder="Describe what care was given and why it mattered..."
                rows={4}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid var(--warm-gray)',
                  background: 'var(--bg-base)',
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 200ms ease',
                  boxSizing: 'border-box',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--orange-primary)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--warm-gray)'; }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <span style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '12px',
                  color: charsLeft < 40 ? '#EF476F' : 'var(--text-muted)',
                  fontWeight: charsLeft < 40 ? 700 : 400,
                }}>
                  {charsLeft} characters remaining
                </span>
              </div>
            </div>

            {/* Bilateral toggle */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '4px',
                  }}>
                    Bilateral Care
                  </label>
                  <p style={{ fontFamily: 'Nunito', fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                    Check if care was mutual — you both gave and received.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setBilateral(!bilateral)}
                  style={{
                    width: '48px',
                    height: '28px',
                    borderRadius: '100px',
                    border: 'none',
                    background: bilateral ? 'var(--orange-primary)' : 'var(--warm-gray)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 200ms ease',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: '4px',
                    left: bilateral ? '24px' : '4px',
                    transition: 'left 200ms ease',
                  }} />
                </button>
              </div>
            </div>

            {/* Info box */}
            <div style={{
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'var(--orange-ultralight)',
              border: '1px solid rgba(244, 125, 49, 0.2)',
            }}>
              <p style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '14px',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: '1.6',
              }}>
                💡 This attestation will be recorded on <strong>Base Sepolia testnet</strong>. You&apos;ll need testnet ETH for gas. Get some at{' '}
                <a href="https://www.alchemy.com/faucets/base-sepolia" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orange-primary)' }}>
                  Alchemy&apos;s Base Sepolia faucet
                </a>.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'rgba(239, 71, 111, 0.08)',
                border: '1px solid rgba(239, 71, 111, 0.3)',
              }}>
                <p style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '14px',
                  color: '#EF476F',
                  margin: 0,
                }}>
                  ⚠️ {error}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid || submitting}
              className="btn-primary"
              style={{
                opacity: !isValid ? 0.5 : 1,
                cursor: !isValid ? 'not-allowed' : 'pointer',
                justifyContent: 'center',
                fontSize: '16px',
                height: '56px',
              }}
            >
              {submitting ? (
                <>
                  <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                  Signing to Base Sepolia…
                </>
              ) : (
                <>✍️ Submit Attestation</>
              )}
            </button>

            {!isConnected && (
              <p style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '13px',
                color: 'var(--text-muted)',
                textAlign: 'center',
                margin: 0,
              }}>
                Connect your wallet above to enable submission.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
