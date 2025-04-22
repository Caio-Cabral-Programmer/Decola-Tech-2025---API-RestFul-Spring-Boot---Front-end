// Modelo para conta (account)
export interface Account {
  number: string;
  agency: string;
  balance: number;
  limit: number;
}

// Modelo para cartão (card)
export interface Card {
  number: string;
  limit: number;
}

// Modelo principal do usuário
export interface User {
  id?: number;
  name: string;
  account: Account;
  card: Card;
}

// Modelo para recursos (features) e notícias (news)
export interface Item {
  icon: string;
  description: string;
}


