// Modelo para cartão (card)  // Este comentário explica que a interface abaixo representa um cartão bancário
export interface Card {  // Define uma interface chamada Card que pode ser usada em outros arquivos
    id?: number;  // O ID do cartão, com ? indicando que é opcional
    number: string;  // O número do cartão, como uma string (ex: "1234 5678 9012 3456")
    limit: number;  // O limite do cartão, como um número (ex: 2000.00)
  }