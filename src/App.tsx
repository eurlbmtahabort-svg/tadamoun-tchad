import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Globe, 
  FileText, 
  ShieldCheck, 
  Baby, 
  HeartPulse, 
  Mic, 
  FolderDown, 
  AlertCircle, 
  Compass, 
  Siren, 
  Menu, 
  X, 
  Check, 
  ArrowRight, 
  Sparkles,
  Award
} from 'lucide-react';

import { Language, NavTab } from './types';
import { translations } from './translations';
import { EmblemHero } from './components/EmblemHero';
import { SosModal } from './components/SosModal';
import { AdminGuidance } from './components/AdminGuidance';
import { LegalForm } from './components/LegalForm';
import { CivilStatusForm } from './components/CivilStatusForm';
import { HealthcareGuide } from './components/HealthcareGuide';
import { VoiceAssistant } from './components/VoiceAssistant';
import { OfflineVault } from './components/OfflineVault';
import { DirectoryContacts } from './components/DirectoryContacts';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'fr' : 'ar';
    setLang(nextLang);
  };

  const navigateTo = (tab: NavTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Top Chadian Tricolor Bar */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#002654]" />
        <div className="flex-1 bg-[#FFCD00]" />
        <div className="flex-1 bg-[#C8102E]" />
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            {/* Mini Emblem Shield */}
            <div className="w-10 h-10 rounded-2xl bg-[#002654] border border-amber-400/60 p-1 flex items-center justify-center shadow-md shrink-0">
              <EmblemHero size={36} />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base tracking-tight text-white">
                  {t.appName}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  تمنراست
                </span>
              </div>
              <p className="text-[10px] text-gray-400 line-clamp-1">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300 border border-slate-700 flex items-center gap-1.5 transition active:scale-95 shadow-sm"
              title="Changer de langue"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.switchLang}</span>
            </button>

            <button
              onClick={() => setIsSosOpen(true)}
              className="p-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black shadow-md shadow-red-600/40 animate-pulse transition active:scale-95"
              aria-label="SOS"
              title="SOS Urgence"
            >
              <Siren className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Sub-nav chips */}
        <div className="max-w-2xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-slate-800/60 text-xs font-semibold">
          {[
            { id: 'home', label: t.tabs.home, icon: Compass },
            { id: 'laissez_passer', label: t.tabs.laissez_passer, icon: FileText },
            { id: 'legal', label: t.tabs.legal, icon: ShieldCheck },
            { id: 'civil_status', label: t.tabs.civil_status, icon: Baby },
            { id: 'healthcare', label: t.tabs.healthcare, icon: HeartPulse },
            { id: 'vault', label: t.tabs.vault, icon: FolderDown }
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id as NavTab)}
                className={`px-3.5 py-1.5 rounded-full shrink-0 flex items-center gap-1.5 transition ${
                  active 
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20' 
                    : 'bg-slate-800/80 text-gray-300 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Body Viewport */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-5 pb-28 space-y-6">
        {/* VIEW: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Hero Card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#001D45] via-[#002654] to-slate-900 border border-blue-900/60 p-6 shadow-2xl overflow-hidden text-center">
              {/* Background Tricolor Radial Accents */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              {/* Central Diplomatic Consular Emblem */}
              <div className="mb-4">
                <EmblemHero size={190} className="mx-auto" />
              </div>

              {/* Candidate Consul Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold mb-3 shadow">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{t.consulCandidateTitle}</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight">
                {t.hero.title}
              </h1>

              <p className="text-xs text-blue-100/90 max-w-md mx-auto leading-relaxed mb-5">
                {t.hero.tagline}
              </p>

              {/* Candidate Pledge Quote */}
              <div className="p-3.5 rounded-2xl bg-black/30 border border-blue-800/40 text-xs text-amber-200/90 italic mb-5 leading-relaxed">
                {t.hero.candidateQuote}
              </div>

              {/* Primary Dual Action Buttons: Call & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:+213661168561"
                  className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs shadow-lg shadow-red-900/50 flex items-center justify-center gap-2.5 transition active:scale-98"
                >
                  <Phone className="w-4 h-4 animate-bounce" />
                  <span>{t.hero.callNow}</span>
                  <span className="font-mono text-[11px] opacity-90">(+213 661 16 85 61)</span>
                </a>

                <a
                  href="https://wa.me/213661168561"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2.5 transition active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.hero.sendWhatsApp}</span>
                </a>
              </div>
            </div>

            {/* Quick Access Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {t.quickActions.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Laissez-Passer Card */}
                <div
                  onClick={() => navigateTo('laissez_passer')}
                  className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/60 transition cursor-pointer flex items-start gap-3.5 group shadow-lg active:scale-98"
                >
                  <div className="w-11 h-11 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                      {t.quickActions.passTitle}
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">
                      {t.quickActions.passDesc}
                    </p>
                  </div>
                </div>

                {/* Legal Consultation Card */}
                <div
                  onClick={() => navigateTo('legal')}
                  className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 transition cursor-pointer flex items-start gap-3.5 group shadow-lg active:scale-98"
                >
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                      {t.quickActions.legalTitle}
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">
                      {t.quickActions.legalDesc}
                    </p>
                  </div>
                </div>

                {/* Newborn Registration Card */}
                <div
                  onClick={() => navigateTo('civil_status')}
                  className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 transition cursor-pointer flex items-start gap-3.5 group shadow-lg active:scale-98"
                >
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                    <Baby className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                      {t.quickActions.newbornTitle}
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">
                      {t.quickActions.newbornDesc}
                    </p>
                  </div>
                </div>

                {/* Healthcare Rights Card */}
                <div
                  onClick={() => navigateTo('healthcare')}
                  className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/60 transition cursor-pointer flex items-start gap-3.5 group shadow-lg active:scale-98"
                >
                  <div className="w-11 h-11 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                      {t.quickActions.healthTitle}
                    </h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5">
                      {t.quickActions.healthDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Voice Assistance Mini Card */}
            <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-600/15 to-transparent border border-amber-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t.quickActions.voiceTitle}</h4>
                  <p className="text-[11px] text-gray-300">{t.quickActions.voiceDesc}</p>
                </div>
              </div>
              <a
                href="https://wa.me/213661168561"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1.5 shadow transition active:scale-95"
              >
                <span>واتساب</span>
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Desert Road Safety Banner (Tamanrasset - In Guezzam - In Salah) */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <Compass className="w-4 h-4" />
                <span>
                  {lang === 'ar' ? 'إرشادات السلامة في المسالك الصحراوية' : 'Sécurité dans les pistes et axes du Sud'}
                </span>
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                {lang === 'ar'
                  ? 'عند التنقل بين تمنراست، عين قزام، عين صالح أو جانت: احمل دائماً مخزون ماء كافياً، احتفظ بنسخة من أوراقك في هاتفك، وفي حال التعطل اضغط زر SOS لنقل موقعك الجغرافي فوراً.'
                  : 'Lors de vos trajets entre Tamanrasset, In Guezzam ou In Salah: conservez toujours de l\'eau, une copie de vos documents sur téléphone, et utilisez le bouton SOS pour envoyer vos coordonnées GPS en cas de panne.'}
              </p>
            </div>
          </div>
        )}

        {/* VIEW: LAISSEZ-PASSER */}
        {activeTab === 'laissez_passer' && <AdminGuidance lang={lang} />}

        {/* VIEW: LEGAL FORM */}
        {activeTab === 'legal' && <LegalForm lang={lang} />}

        {/* VIEW: CIVIL STATUS / NEWBORN REGISTRY */}
        {activeTab === 'civil_status' && <CivilStatusForm lang={lang} />}

        {/* VIEW: HEALTHCARE & HUMANITARIAN RIGHTS */}
        {activeTab === 'healthcare' && <HealthcareGuide lang={lang} />}

        {/* VIEW: CONTACTS & DIRECTORY */}
        {activeTab === 'contacts' && <DirectoryContacts lang={lang} />}

        {/* VIEW: OFFLINE VAULT */}
        {activeTab === 'vault' && <OfflineVault lang={lang} />}
      </main>

      {/* Floating SOS Hotline Button */}
      <div className="fixed bottom-20 end-4 z-40">
        <button
          onClick={() => setIsSosOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-xs shadow-2xl shadow-red-600/60 hover:scale-105 active:scale-95 transition ring-4 ring-red-500/30 group"
          aria-label="SOS"
        >
          <Siren className="w-5 h-5 animate-spin group-hover:animate-none" />
          <span className="uppercase tracking-wider">{t.sosButton}</span>
        </button>
      </div>

      {/* Bottom App Navigation Bar (Touch-Optimized for Android APK) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 shadow-2xl">
        <div className="max-w-md mx-auto px-3 py-2 flex items-center justify-around">
          <button
            onClick={() => navigateTo('home')}
            className={`flex flex-col items-center gap-1 p-1.5 transition ${
              activeTab === 'home' ? 'text-amber-400 font-bold scale-105' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px]">{t.tabs.home}</span>
          </button>

          <button
            onClick={() => navigateTo('laissez_passer')}
            className={`flex flex-col items-center gap-1 p-1.5 transition ${
              activeTab === 'laissez_passer' ? 'text-amber-400 font-bold scale-105' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-[10px]">{t.tabs.laissez_passer}</span>
          </button>

          <button
            onClick={() => navigateTo('legal')}
            className={`flex flex-col items-center gap-1 p-1.5 transition ${
              activeTab === 'legal' ? 'text-amber-400 font-bold scale-105' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px]">{t.tabs.legal}</span>
          </button>

          <button
            onClick={() => navigateTo('civil_status')}
            className={`flex flex-col items-center gap-1 p-1.5 transition ${
              activeTab === 'civil_status' ? 'text-amber-400 font-bold scale-105' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Baby className="w-5 h-5" />
            <span className="text-[10px]">{t.tabs.civil_status}</span>
          </button>

          <button
            onClick={() => navigateTo('vault')}
            className={`flex flex-col items-center gap-1 p-1.5 transition ${
              activeTab === 'vault' ? 'text-amber-400 font-bold scale-105' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <FolderDown className="w-5 h-5" />
            <span className="text-[10px]">{t.tabs.vault}</span>
          </button>
        </div>
      </nav>

      {/* SOS Modal Dialog */}
      <SosModal
        lang={lang}
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
      />
    </div>
  );
}
