import React, { useState } from 'react';
import { Logo } from './Logo';
import { SiteConfig } from '../types';
import { Lock, User, AlertCircle, ArrowLeft, Eye, EyeOff, ShieldCheck, KeyRound } from 'lucide-react';

interface ManagerLoginModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onCancel: () => void;
  siteConfig?: SiteConfig;
  onSaveCredentials?: (username: string, password: string) => void;
}

export const ManagerLoginModal: React.FC<ManagerLoginModalProps> = ({
  isOpen,
  onSuccess,
  onCancel,
  siteConfig,
  onSaveCredentials,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Verifica se já existem credenciais exclusivas configuradas no sistema
  const hasConfiguredCredentials = Boolean(
    siteConfig?.managerUsername?.trim() && siteConfig?.managerPassword?.trim()
  );

  const handleResetForm = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
  };

  const handleClose = () => {
    handleResetForm();
    onCancel();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser) {
      setError('Por favor, introduza o nome de utilizador.');
      return;
    }

    if (!cleanPass) {
      setError('Por favor, introduza a palavra-passe.');
      return;
    }

    // FLUXO 1: Se ainda não existem credenciais configuradas (primeiro acesso)
    if (!hasConfiguredCredentials) {
      if (cleanPass.length < 4) {
        setError('A palavra-passe exclusiva deve ter pelo menos 4 caracteres.');
        return;
      }

      if (cleanPass !== confirmPassword.trim()) {
        setError('A confirmação da palavra-passe não coincide.');
        return;
      }

      // Guarda as credenciais exclusivas criadas pelo gestor
      if (onSaveCredentials) {
        onSaveCredentials(cleanUser, cleanPass);
      }

      handleResetForm();
      onSuccess();
      return;
    }

    // FLUXO 2: Verificação estrita contra as credenciais exclusivas configuradas
    const expectedUser = siteConfig!.managerUsername!.trim().toLowerCase();
    const expectedPass = siteConfig!.managerPassword!.trim();

    if (cleanUser.toLowerCase() === expectedUser && cleanPass === expectedPass) {
      handleResetForm();
      onSuccess();
    } else {
      setError('Credenciais incorretas. Verifique o utilizador e a palavra-passe exclusivos.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Cabeçalho */}
        <div className="p-6 bg-slate-900 text-white flex flex-col items-center text-center relative">
          <button
            type="button"
            onClick={handleClose}
            className="absolute left-4 top-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Voltar ao modo cliente"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-3 text-indigo-400">
            {hasConfiguredCredentials ? (
              <Lock className="w-6 h-6" />
            ) : (
              <KeyRound className="w-6 h-6 text-amber-400" />
            )}
          </div>

          <h2 className="text-lg font-black tracking-tight text-white">
            {hasConfiguredCredentials ? 'Autenticação de Gestor' : 'Configurar Acesso Exclusivo'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {hasConfiguredCredentials
              ? 'Área restrita à equipa de administração da DUOTEC'
              : 'Defina o seu utilizador e palavra-passe exclusiva para o primeiro acesso'}
          </p>
        </div>

        {/* Formulário de Login / Configuração Inicial */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {!hasConfiguredCredentials && (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Nenhuma palavra-passe padrão foi pré-configurada. Crie as suas credenciais exclusivas abaixo para proteger o painel.
              </span>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Nome de Utilizador
            </label>
            <div className="relative">
              <input
                type="text"
                id="login-utilizador"
                value={username}
                onChange={(e) => {
                  setError(null);
                  setUsername(e.target.value);
                }}
                placeholder="Introduza o seu utilizador"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium"
                required
                autoComplete="off"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Palavra-passe / Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="login-senha"
                value={password}
                onChange={(e) => {
                  setError(null);
                  setPassword(e.target.value);
                }}
                placeholder={hasConfiguredCredentials ? 'Introduza a sua palavra-passe' : 'Mínimo 4 caracteres'}
                className="w-full pl-9 pr-9 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium"
                required
                autoComplete="current-password"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                title={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {!hasConfiguredCredentials && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Confirmar Palavra-passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-confirmar-senha"
                  value={confirmPassword}
                  onChange={(e) => {
                    setError(null);
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="Repita a palavra-passe"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900 font-medium"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              </div>
            </div>
          )}

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              id="btn-entrar-gestor"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              {hasConfiguredCredentials ? 'Iniciar Sessão como Gestor' : 'Guardar Credenciais e Aceder'}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2 px-4 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors cursor-pointer"
            >
              Voltar para Modo Cliente (Sem Login)
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
