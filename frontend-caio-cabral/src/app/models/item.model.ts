// Modelo para recursos (features) e notícias (news)  // Este comentário explica que a interface abaixo representa itens genéricos como recursos ou notícias
export interface Item {  // Define uma interface chamada Item que pode ser usada em outros arquivos
    icon: string;  // O ícone do item, como uma string (ex: "home", "credit_card")
    description: string;  // A descrição do item, como uma string (ex: "Pague suas contas sem sair de casa")
  }