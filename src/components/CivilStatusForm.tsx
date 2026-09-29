import React, { useState } from 'react';
import { Baby, FileCheck2, Send, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';
import { Language, NewbornRegistration } from '../types';
import { translations } from '../translations';

interface CivilStatusFormProps {
  lang: Language;
  onSuccessSave?: (record: NewbornRegistration) => void;
}

export const CivilStatusForm: React.FC<CivilStatusFormProps> = ({ lang, onSuccessSave }) => {
  const t = translations[lang].civilStatusSection;
  const [childName, setChildName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [birthDate, setBirthDate] = useState('');
  const [birthPlace, setBirthPlace] = useState('EPH Tamanrasset (Hôpital Mixte)');
  const [fatherName, setFatherName] = useState('');
  const [fatherNationality, setFatherNationality] = useState('Tchadienne / تشادية');
  const [motherName, setMotherName] = useState('');
  const [motherNationality, setMotherNationality] = useState('Tchadienne / تشادية');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState<NewbornRegistration | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim() || !fatherName.trim()) return;

    const newId = `EC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const record: NewbornRegistration = {
      id: newId,
      date: new Date().toISOString(),
      childName,
      gender,
      birthDate: birthDate || new Date().toISOString().split('T')[0],
      birthPlace,
      fatherName: `${fatherName} (${fatherNationality})`,
      fatherNationality,
      motherName: `${motherName} (${motherNationality})`,
      motherNationality,
      phone,
      hospitalCertificateNumber: certificateNumber || 'En attente / قيد الاستخراج',
      status: 'recorded'
    };

    try {
      const existing = localStorage.getItem('tt_newborns');
      const list: NewbornRegistration[] = existing ? JSON.parse(existing) : [];
      list.unshift(record);
      localStorage.setItem('tt_newborns', JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }

    setSubmittedRecord(record);
    if (onSuccessSave) onSuccessSave(record);

    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  };

  const getWhatsAppRegistrationUrl = () => {
    if (!submittedRecord) return '#';
    const text = lang === 'ar'
      ? `👶 تسجيل ولادة مولود جديد بالقنصلية الفخرية (كود: ${submittedRecord.id})\n` +
        `• اسم المولود: ${submittedRecord.childName} (${submittedRecord.gender === 'male' ? 'ذكر' : 'أنثى'})\n` +
        `• تاريخ ومكان الولادة: ${submittedRecord.birthDate} - ${submittedRecord.birthPlace}\n` +
        `• الأب: ${submittedRecord.fatherName}\n` +
        `• الأم: ${submittedRecord.motherName}\n` +
        `• رقم إشعار المستشفى: ${submittedRecord.hospitalCertificateNumber}\n` +
        `• هاتف الولي: ${submittedRecord.phone}\n` +
        `مطلوب: استخراج شهادة ميلاد قنصلية وحماية الهوية القانونية.`
      : `👶 Déclaration Consulaire de Nouveau-né (Réf: ${submittedRecord.id})\n` +
        `• Enfant: ${submittedRecord.childName} (${submittedRecord.gender === 'male' ? 'Garçon' : 'Fille'})\n` +
        `• Né(e) le: ${submittedRecord.birthDate} à ${submittedRecord.birthPlace}\n` +
        `• Père: ${submittedRecord.fatherName}\n` +
        `• Mère: ${submittedRecord.motherName}\n` +
        `• N° Certificat d'accouchement: ${submittedRecord.hospitalCertificateNumber}\n` +
        `• Tél Parent: ${submittedRecord.phone}\n` +
        `Demande d'acte de naissance consulaire et protection contre l'apatridie.`;

    return `https://wa.me/213661168561?text=${encodeURIComponent(text)}`;
  };

  const resetForm = () => {
    setSubmittedRecord(null);
    setChildName('');
    setFatherName('');
    setMotherName('');
    setCertificateNumber('');
    setPhone('');
  };

  return (
    <div className="space-y-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/70 to-slate-900 border border-emerald-900/40 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
            <Baby className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">{t.title}</h2>
            <p className="text-xs text-emerald-200/80">{t.subtitle}</p>
          </div>
        </div>

        {/* Protection Importance */}
        <div className="mt-3 p-3 rounded-2xl bg-emerald-950/50 border border-emerald-800/60 flex items-start gap-2.5 text-xs text-emerald-200">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <span>{t.importance}</span>
        </div>
      </div>

      {submittedRecord ? (
        <div className="p-6 rounded-3xl bg-slate-900 border-2 border-emerald-500/80 shadow-2xl text-center space-y-4 animate-scaleUp">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-lg font-black text-white mb-1">
              {lang === 'ar' ? 'تم تسجيل بيانات المولود بنجاح!' : 'Déclaration enregistrée avec succès!'}
            </h3>
            <div className="inline-block px-4 py-2 rounded-2xl bg-slate-800 border border-emerald-500/50 font-mono text-xl font-black text-amber-400 tracking-wider">
              {submittedRecord.id}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {lang === 'ar'
                ? 'سجل المولود محفوظ محلياً. اضغط الزر أدناه لإرسال الملف وشهادة المستشفى إلى القنصل عبر واتساب لإتمام شهادة الميلاد.'
                : 'Dossier sauvegardé. Transmettez la déclaration avec photo du certificat d\'accouchement par WhatsApp au Consul.'}
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <a
              href={getWhatsAppRegistrationUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 transition active:scale-98"
            >
              <MessageSquare className="w-5 h-5" />
              {lang === 'ar' ? 'إرسال الملف إلى القنصل عبر واتساب' : 'Transmettre au Consul sur WhatsApp'}
            </a>

            <button
              onClick={resetForm}
              className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-gray-300 font-medium text-xs transition"
            >
              {lang === 'ar' ? 'تسجيل مولود آخر' : 'Nouvelle déclaration'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
          {/* Child Name & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.childName}</label>
              <input
                type="text"
                required
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder={lang === 'ar' ? 'الاسم واللقب للمولود' : 'Prénom(s) et Nom de l\'enfant'}
                className="w-full p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.gender}</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`flex-1 py-3 rounded-2xl text-xs font-bold transition border ${
                    gender === 'male'
                      ? 'bg-blue-600 border-blue-400 text-white shadow'
                      : 'bg-slate-800 border-slate-700 text-gray-400'
                  }`}
                >
                  {t.male}
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`flex-1 py-3 rounded-2xl text-xs font-bold transition border ${
                    gender === 'female'
                      ? 'bg-rose-600 border-rose-400 text-white shadow'
                      : 'bg-slate-800 border-slate-700 text-gray-400'
                  }`}
                >
                  {t.female}
                </button>
              </div>
            </div>
          </div>

          {/* Birth Date & Place */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.birthDate}</label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.birthPlace}</label>
              <input
                type="text"
                required
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                placeholder="EPH Tamanrasset / Tahabort / Maternité"
                className="w-full p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Father Info */}
          <div className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-2">
            <label className="block text-xs font-bold text-amber-400">{t.fatherName}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                placeholder={lang === 'ar' ? 'اسم ولقب الأب' : 'Nom complet du père'}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={fatherNationality}
                onChange={(e) => setFatherNationality(e.target.value)}
                placeholder="Nationalité (Tchadienne)"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Mother Info */}
          <div className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-2">
            <label className="block text-xs font-bold text-amber-400">{t.motherName}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                placeholder={lang === 'ar' ? 'اسم ولقب الأم قبل الزواج' : 'Nom complet de la mère'}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="text"
                value={motherNationality}
                onChange={(e) => setMotherNationality(e.target.value)}
                placeholder="Nationalité (Tchadienne)"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Hospital Certificate Number & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.certificateNumber}</label>
              <input
                type="text"
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value)}
                placeholder="N° Acte / Notification hôpital"
                className="w-full p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">{t.phone}</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="06 XX XX XX XX / +213..."
                className="w-full p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 transition active:scale-98"
          >
            <FileCheck2 className="w-4 h-4" />
            {t.submitBtn}
          </button>
        </form>
      )}
    </div>
  );
};
