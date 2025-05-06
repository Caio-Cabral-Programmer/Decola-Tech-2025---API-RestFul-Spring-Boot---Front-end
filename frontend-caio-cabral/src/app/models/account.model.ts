// Modelo para conta (account)  // Este comentário explica que a interface abaixo representa uma conta bancária
export interface Account {  // Define uma interface chamada Account que pode ser usada em outros arquivos
    id?: number;  // O ID da conta, com ? indicando que é opcional (talvez para contas novas que ainda não têm ID)
    number: string;  // O número da conta, como uma string (ex: "12345-6")
    agency: string;  // A agência bancária, como uma string (ex: "0001")
    balance: number;  // O saldo da conta, como um número (ex: 1000.50)
    limit: number;  // O limite da conta, como um número (ex: 500.00)
  }