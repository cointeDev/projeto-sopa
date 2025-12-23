import { Info, Database, FileText, Settings, Users, BarChart3, RefreshCw } from 'lucide-react';

export function Mvp() {
  const handleNavigation = (page: string) => {
    console.log(`Navegando para: ${page}`);
  };

  const handleResetDatabase = () => {
    console.log('Resetando banco de dados...');
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-blue-900/80" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="container mx-auto px-6 py-12 flex-1 flex flex-col justify-center max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300 tracking-wide uppercase">
                    Demonstração MVP
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Sistema de Gestão de Demandas
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed">
                  Este é um <span className="text-blue-400 font-semibold">MVP</span> (Produto Mínimo Viável) -
                  uma versão inicial do sistema com as funcionalidades essenciais para validar a ideia e
                  coletar feedback dos usuários.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-400" />
                  O que é um MVP?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Um MVP permite testar as funcionalidades principais com usuários reais,
                  identificar melhorias necessárias e evoluir o produto de forma incremental,
                  economizando tempo e recursos no desenvolvimento.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Navegue pelo Sistema:</h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleNavigation('novo-pedido')}
                    className="group flex items-center gap-3 px-5 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                  >
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">Novo Pedido</span>
                  </button>

                  <button
                    onClick={() => handleNavigation('consultar')}
                    className="group flex items-center gap-3 px-5 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span className="font-medium">Consultar Pedidos</span>
                  </button>

                  <button
                    onClick={() => handleNavigation('usuarios')}
                    className="group flex items-center gap-3 px-5 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Users className="w-5 h-5" />
                    <span className="font-medium">Usuários</span>
                  </button>

                  <button
                    onClick={() => handleNavigation('configuracoes')}
                    className="group flex items-center gap-3 px-5 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Configurações</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Database className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Gerenciamento de Dados</h3>
                      <p className="text-sm text-gray-400">Controle total do banco de dados</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-sm font-semibold text-white mb-2">Funcionalidades Disponíveis:</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          Criar e gerenciar pedidos
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          Consultar status de solicitações
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          Gerenciar usuários do sistema
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          Configurações personalizadas
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={handleResetDatabase}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/50 rounded-lg transition-all duration-300 hover:scale-105 group"
                    >
                      <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                      <span className="font-semibold">Resetar Banco de Dados</span>
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      Use esta opção para limpar todos os dados de teste
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-yellow-300">Ambiente de Demonstração</h4>
                    <p className="text-xs text-yellow-200/80">
                      Esta é uma versão de demonstração. Os dados podem ser resetados a qualquer momento
                      para testes e validações.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">Sistema MVP em Operação</span>
              </div>
              <p className="text-sm text-gray-500">
                Versão 1.0.0 - Produto Mínimo Viável
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
