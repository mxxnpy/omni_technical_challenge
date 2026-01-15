export function printStartupBanner(port: number): void {
  const reset = '\x1b[0m';
  const bold = '\x1b[1m';
  const cyan = '\x1b[36m';
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const magenta = '\x1b[35m';
  const dim = '\x1b[2m';
  const blue = '\x1b[34m';

  const banner = `
${cyan}${bold}
   ██████╗ ███╗   ███╗███╗   ██╗██╗
  ██╔═══██╗████╗ ████║████╗  ██║██║
  ██║   ██║██╔████╔██║██╔██╗ ██║██║
  ██║   ██║██║╚██╔╝██║██║╚██╗██║██║
  ╚██████╔╝██║ ╚═╝ ██║██║ ╚████║██║
   ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝
${reset}
  ${magenta}${bold}Technical Challenge - API REST${reset}
  ${dim}Sistema de Transacoes Monetarias${reset}

${yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}

  ${green}${bold}✓${reset} ${bold}Servidor iniciado com sucesso!${reset}
  ${cyan}➜${reset} Local:   ${bold}http://localhost:${port}${reset}
  ${cyan}➜${reset} Swagger: ${bold}http://localhost:${port}/swagger${reset}

${yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}

  ${blue}${bold}ENDPOINTS DISPONIVEIS${reset}

  ${dim}[POST]${reset}  ${cyan}/users/signup${reset}   ${dim}→ Cadastro de usuario${reset}
  ${dim}[POST]${reset}  ${cyan}/users/signin${reset}   ${dim}→ Login de usuario${reset}
  ${dim}[GET]${reset}   ${cyan}/users${reset}          ${dim}→ Listar todos usuarios${reset}
  ${dim}[POST]${reset}  ${cyan}/transfer${reset}       ${dim}→ Transferencia entre usuarios${reset}

${yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}

  ${blue}${bold}ARQUITETURA${reset}

  ${green}●${reset} Clean Architecture + SOLID
  ${green}●${reset} Domain Layer ${dim}(Entities, Repository Interfaces)${reset}
  ${green}●${reset} Application Layer ${dim}(Use Cases)${reset}
  ${green}●${reset} Infrastructure Layer ${dim}(TypeORM Repositories)${reset}
  ${green}●${reset} Presentation Layer ${dim}(Controllers, DTOs)${reset}

${yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}

  ${blue}${bold}TECNOLOGIAS${reset}

  ${magenta}◆${reset} NestJS        ${dim}Framework Node.js${reset}
  ${magenta}◆${reset} TypeORM       ${dim}ORM para persistencia${reset}
  ${magenta}◆${reset} PostgreSQL    ${dim}Banco de dados${reset}
  ${magenta}◆${reset} Docker        ${dim}Containerizacao${reset}
  ${magenta}◆${reset} Jest          ${dim}Testes unitarios e e2e${reset}

${yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}

  ${dim}Created by: Leandro S. Silva${reset}

`;

  console.log(banner);
}
