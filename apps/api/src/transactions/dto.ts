export interface TxnDto {
  id: string;
  createdAt: string;
  accountId: string;
  kind: 'auth' | 'capture' | 'reversal' | 'refund' | 'manual';
  amountCents: number;
  mcc?: string | null;
  extId?: string | null;
}

export interface TxnPage {
  items: TxnDto[];
  nextCursor?: string | null;
}
