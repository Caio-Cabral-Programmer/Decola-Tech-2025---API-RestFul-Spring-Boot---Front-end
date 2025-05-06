import { Account } from "./account.model";
import { Card } from "./card.model";

// Modelo principal do usuário  // Este comentário explica que a interface abaixo representa um usuário do sistema
export interface User {  // Define uma interface chamada User que pode ser usada em outros arquivos
  id?: number;  // O ID do usuário, com ? indicando que é opcional
  name: string;  // O nome do usuário, como uma string (ex: "Maria Silva")
  account: Account;  // A conta bancária do usuário, usando a interface Account
  card: Card;  // O cartão do usuário, usando a interface Card
}

/* Foi separado cada interface em um arquivo diferente, para tornar o código ainda mais organizado e fácil de manter. */

/* Este arquivo é super importante porque:

1. Define a estrutura dos dados : Ele diz ao TypeScript e ao Angular como os dados devem ser organizados. É como ter um mapa que mostra onde cada coisa deve ficar!
2. Garante consistência : Ao definir interfaces, você garante que todos os objetos desse tipo terão as mesmas propriedades. É como garantir que todos os bolinhos feitos com a mesma forminha terão o mesmo formato!
3. Fornece autocompletar e verificação de tipos : Quando você usa estas interfaces em outros arquivos, o editor de código pode sugerir as propriedades disponíveis e avisar se você tentar usar uma propriedade que não existe. É como ter um amiguinho que te lembra quais ingredientes você precisa para cada receita!
4. Facilita a comunicação com o backend : Estas interfaces provavelmente correspondem às estruturas de dados que vêm da API do backend. É como ter um tradutor que ajuda o frontend e o backend a se entenderem!
5. Melhora a manutenção : Se a estrutura dos dados mudar, você só precisa atualizar estas interfaces, e o TypeScript vai te mostrar todos os lugares que precisam ser atualizados. É como mudar a receita em um só lugar e saber exatamente quais bolos serão afetados! */


