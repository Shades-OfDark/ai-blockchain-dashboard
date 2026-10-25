/**
 * Core TypeScript Interfaces for the Decentralized AI-Agent Orchestrator
 * Purpose: Enforces strict compile-time type safety between the React/TS Dashboard,
 * the Java Spring Boot REST API, and the Python LangGraph AI Agent outputs.
 */

export type TransactionStatus = 'PENDING' | 'VALIDATED' | 'REJECTED';

export type AgentActionType =
  | 'EXECUTE_SWAP'
  | 'HALT_NODE'
  | 'REBALANCE_POOL'
  | 'HOLD';

/**
 * Represents an individual on-chain or mempool transaction
 * managed by the Java Spring Boot backend.
 */
export interface ITransaction {
  readonly transactionId: string;
  readonly senderAddress: string;
  readonly recipientAddress: string;
  readonly amount: number;
  readonly timestamp: number;
  readonly signature: string;
  status: TransactionStatus;
}

/**
 * Mirrors the exact Block.java class structure in the Enterprise Java Node.
 */
export interface IBlock {
  readonly index: number;
  readonly timestamp: number;
  readonly transactions: ITransaction[];
  readonly previousHash: string;
  readonly hash: string;
  readonly nonce: number;
}

/**
 * Represents the structured JSON output emitted by the LangGraph + AWS Bedrock Agent.
 */
export interface IAgentDecision {
  readonly decisionId: string;
  readonly agentId: string;
  readonly timestamp: number;
  readonly confidenceScore: number; // Range: 0.0 to 1.0
  readonly recommendedAction: AgentActionType;
  readonly reasoningSummary: string;
  readonly targetBlockIndex?: number;
  readonly payload: Record<string, string | number | boolean>;
}

/**
 * Contract for any service class that fetches blockchain state from Spring Boot.
 * Demonstrates OOP Interface segregation (Stephen Grider TS Pattern).
 */
export interface IBlockchainApiService {
  fetchLatestBlocks(limit: number): Promise<IBlock[]>;
  submitAgentDecision(decision: IAgentDecision): Promise<boolean>;
}
