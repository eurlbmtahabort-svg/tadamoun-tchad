import { Language } from './types';

export const translations = {
  ar: {
    appName: 'تضامن تشاد',
    appSubtitle: 'خدمة الجالية التشادية - تمنراست والجنوب الجزائري',
    consulCandidateTitle: 'مبادرة مرشح منصب القنصل الفخري لجمهورية تشاد بتمنراست',
    candidatePledge: 'كرامة، حماية، وقرب دائم من أبناء وبنات الوطن في أقصى الجنوب',
    emergencyHotline: 'خط الطوارئ القنصلي 24/7',
    sosButton: 'استغاثة عاجلة SOS',
    whatsappVoice: 'رسالة صوتية / واتساب',
    phoneLabel: '+213 661 16 85 61',
    switchLang: 'Français',

    tabs: {
      home: 'الرئيسية',
      laissez_passer: 'وثائق السفر',
      legal: 'استشارة قانونية',
      civil_status: 'تسجيل المواليد',
      healthcare: 'الصحة والحقوق',
      contacts: 'دليل الطوارئ',
      vault: 'ملفي المحفوظ',
      android_source: 'مشروع APK'
    },

    hero: {
      title: 'سندكم الدائم في تمنراست والولايات الجنوبية',
      tagline: 'منصة رقمية موجهة لخدمة ورعاية الجالية التشادية المقيمة والعابرة بالجنوب الجزائري، لدعم الحقوق، تيسير المعاملات الإدارية، والحماية الإنسانية الشاملة.',
      callNow: 'اتصال فوري بالطوارئ',
      sendWhatsApp: 'تواصل عبر واتساب',
      candidateQuote: '«خدمة المواطن التشادي حيثما وجد واجب وطني، وتمنراست بوابة التضامن والأخوة الإفريقية.»'
    },

    quickActions: {
      title: 'خدمات سريعة ومباشرة',
      passTitle: 'جواز المرور القنصلي',
      passDesc: 'إجراءات Laissez-Passer للعودة المستعجلة',
      legalTitle: 'استشارة سرية وآمنة',
      legalDesc: 'مساعدة قانونية بدون كشف الهوية عند الحاجة',
      newbornTitle: 'تسجيل المواليد الجدد',
      newbornDesc: 'حماية الهوية القانونية للأطفال ومنع انعدام الجنسية',
      healthTitle: 'العلاج والحالات الحرجة',
      healthDesc: 'حق العلاج المجاني للمستعجلات ومراكز الهلال الأحمر',
      voiceTitle: 'تسجيل صوتي مباشر',
      voiceDesc: 'أرسل مشكلتك صوتياً بدون الحاجة للكتابة'
    },

    laissezPasserSection: {
      title: 'الدليل الإداري: جواز المرور (Laissez-Passer) والوثائق',
      subtitle: 'كل ما تحتاج معرفته لاستخراج تصريح السفر الاستعجالي، تجديد جوازات السفر، والتسجيل القنصلي',
      checklistTitle: 'قائمة الوثائق المطلوبة (يمكنك التأشير عليها)',
      emergencyNotice: 'تنبيه إنساني: في حالات الترحيل الإنساني أو المرض أو فقدان الوثائق، يتم التعامل الفوري والأولوية القصوى.',
      tabs: {
        laissez_passer: 'جواز المرور (Laissez-Passer)',
        passport: 'جواز السفر البيومتري',
        immatriculation: 'التسجيل القنصلي',
        loss_theft: 'تصريح الضياع / السرقة'
      },
      validity: 'مدة الصلاحية:',
      processingTime: 'مدة المعالجة:',
      fee: 'الرسوم:',
      requirements: 'الشروط والوثائق:'
    },

    legalSection: {
      title: 'استمارة الاستشارة القانونية والمساعدة الإنسانية',
      subtitle: 'مساحة سرية ومحمية تماماً للتواصل بشأن الوضعيات الإدارية، التوقيف، أو النزاعات العمالية',
      confidentialityNotice: '🔒 خصوصية تامة: بياناتك لا تتم مشاركتها مع أي جهة خارجية. يمكنك اختيار تقديم الطلب باسم مستعار دون كشف هويتك الكاملة.',
      fullName: 'الاسم واللقب (أو الاسم المستعار)',
      anonymousMode: 'طلب استشارة مجهول الهوية (اسم مستعار)',
      phone: 'رقم الهاتف للتواصل أو الواتساب',
      wilaya: 'الولاية / المدينة الحالية',
      category: 'نوع المشكلة أو الاستشارة',
      categories: {
        regularization: 'تسوية الوضعية الإدارية والإقامة',
        detention: 'احتجاز أو توقيف شخص من أفراد العائلة',
        work_dispute: 'نزاع عمالي / عدم استلام المستحقات المالية',
        lost_papers: 'فقدان أو حجز وثائق الهوية',
        humanitarian: 'مساعدة إنسانية عاجلة / مرض / انقطاع السبل',
        other: 'استشارة قنصلية أخرى'
      },
      description: 'اشرح الوضعية باختصار وبكل وضوح',
      submitBtn: 'إرسال الاستشارة بسرية تامة',
      sendingWhatsApp: 'فتح واتساب للإرسال المباشر للقنصل الفخري',
      successMessage: 'تم تسجيل طلبك بنجاح! احتفظ برمز المتابعة التالي:'
    },

    civilStatusSection: {
      title: 'التسجيل المدني وحماية المواليد الجدد',
      subtitle: 'تسجيل ولادة الأطفال في تمنراست والجنوب لضمان استخراج شهادة الميلاد القنصلية وحمايتهم من انعدام الجنسية',
      importance: '🛡️ أهمية التسجيل: تسجيل المولود في أجل لا يتعدى 30 يوماً يمنح طفلك صفة المواطن التشادي، ويسهل استخراج جواز سفره وحمايته القانونية الكاملة.',
      childName: 'اسم المولود كاملاً',
      gender: 'جنس المولود',
      male: 'ذكر',
      female: 'أنثى',
      birthDate: 'تاريخ الولادة',
      birthPlace: 'مكان الولادة (المستشفى أو المصحة أو المنزل)',
      fatherName: 'اسم الأب كاملاً وجنسيته',
      motherName: 'اسم الأم كاملاً وجنسيتها',
      certificateNumber: 'رقم إشعار الولادة الصادر من المستشفى (Certificat d\'accouchement)',
      phone: 'رقم هاتف الولي',
      submitBtn: 'تسجيل المولود في السجل القنصلي الأولي',
      success: 'تم تسجيل بيانات المولود في قاعدة البيانات الآمنة محلياً.'
    },

    healthcareSection: {
      title: 'الحقوق الصحية والمستعجلات الطبية في الجنوب الجزائري',
      subtitle: 'دليل الرعاية الصحية، حق الولادة، والمراكز الإنسانية بالمنطقة',
      urgentRight: '⚖️ حق العلاج الاستعجالي مكفول بموجب القانون الجزائري (قانون الصحة): كل الحالات الطبية الحرجة ومستعجلات الولادة تستقبل دون اشتراط مسبق للوثائق.',
      hospitals: [
        {
          name: 'المؤسسة العمومية الاستشفائية بتمنراست (المستشفى المختلط)',
          address: 'وسط مدينة تمنراست',
          phone: '029 34 50 50',
          type: 'مستشفى عام + مصلحة المستعجلات والولادة'
        },
        {
          name: 'مكتب الهلال الأحمر الجزائري - تمنراست',
          address: 'حي أدريان، تمنراست',
          phone: '029 32 18 19',
          type: 'مساعدات إنسانية، أدوية، وإعانة عاجلة'
        },
        {
          name: 'عيادة تاهابورت المتعددة الخدمات',
          address: 'حي تاهابورت، تمنراست',
          phone: '029 34 22 10',
          type: 'فحوصات أولية، تطعيم الأطفال، رعاية الحوامل'
        },
        {
          name: 'مستشفى عين قزام الحدودي',
          address: 'عين قزام، الشريط الحدودي',
          phone: '029 30 11 20',
          type: 'مستعجلات طبية ونقل إسعافي'
        }
      ]
    },

    voiceAssistant: {
      title: 'المساعد الصوتي والرسائل الصوتية المباشرة',
      subtitle: 'إذا كنت تفضل الحديث أو تواجه صعوبة في القراءة والكتابة، اضغط وتحدث مباشرة لإرسال رسالتك للقنصل الفخري عبر واتساب',
      recordInstruction: 'اضغط على زر التسجيل وتحدث بلهجتك أو باللغة التي تريحك',
      recording: 'جاري الاستماع والتسجيل... اضغط لإيقاف التسجيل',
      recordButton: 'بدء التسجيل الصوتي',
      stopButton: 'إنهاء التسجيل والاستماع',
      sendViaWhatsApp: 'إرسال التسجيل إلى القنصل عبر واتساب',
      readAloud: 'قراءة محتوى هذه الصفحة صوتياً'
    },

    offlineVault: {
      title: 'الملف الشخصي المحفوظ بدون إنترنت (Hors-Ligne)',
      subtitle: 'جميع طلباتك واستشاراتك المسجلة محفوظة في ذاكرة هاتفك للرجوع إليها حتى بدون شبكة',
      empty: 'لم تقم بحفظ أي طلب حتى الآن.',
      exportCode: 'نسخ الكود الكامل للتطبيق (APK Source)',
      exportSuccess: 'تم نسخ محتوى التطبيق بالكامل للحافظة.'
    },

    sosModal: {
      title: 'طوارئ واستغاثة عاجلة (SOS)',
      warning: 'استخدم هذه الأرقام فقط للحالات الطارئة جداً: حوادث الطرقات بالصحراء، الاعتقال المفاجئ، أو الحالات الصحية الحرجة.',
      consulDirect: 'الاتصال المباشر بمرشح القنصل الفخري',
      civilProtection: 'الحماية المدنية الجزائرية (الإسعاف والإطفاء): 14',
      police: 'الشرطة الجزائرية: 17 أو 1548',
      samu: 'المستعجلات الطبية (SAMU): 3015',
      gpsCoords: 'محدد الموقع الجغرافي بالصحراء (GPS):',
      gettingGps: 'جاري تحديد إحداثياتك بالصحراء...',
      sendGpsWhatsapp: 'إرسال إحداثيات موقعي عبر واتساب للطوارئ'
    }
  },

  fr: {
    appName: 'Tadamoun Tchad',
    appSubtitle: 'Communauté Tchadienne - Tamanrasset & Sud Algérien',
    consulCandidateTitle: 'Initiative du Candidat au Poste de Consul Honoraire du Tchad à Tamanrasset',
    candidatePledge: 'Dignité, Protection et Proximité Continue au service de la Diaspora dans le Grand Sud',
    emergencyHotline: 'Hotline Urgence Consulaire 24/7',
    sosButton: 'Urgence SOS',
    whatsappVoice: 'Message Vocal / WhatsApp',
    phoneLabel: '+213 661 16 85 61',
    switchLang: 'العربية',

    tabs: {
      home: 'Accueil',
      laissez_passer: 'Documents Voyage',
      legal: 'Aide Juridique',
      civil_status: 'État Civil',
      healthcare: 'Santé & Droits',
      contacts: 'Urgences',
      vault: 'Mon Dossier',
      android_source: 'Projet APK'
    },

    hero: {
      title: 'Votre Soutien Permanent à Tamanrasset et dans le Sud',
      tagline: 'Plateforme mobile dédiée à l\'assistance de la communauté tchadienne résidente et en transit dans le Sud Algérien: défense des droits, démarches administratives et protection humanitaire.',
      callNow: 'Appel Urgence Direct',
      sendWhatsApp: 'Contacter sur WhatsApp',
      candidateQuote: '« Servir le citoyen tchadien où qu\'il soit est un devoir sacré. Tamanrasset est le pont de fraternité et de solidarité panafricaine. »'
    },

    quickActions: {
      title: 'Services Rapides & Directs',
      passTitle: 'Laissez-Passer Consulaire',
      passDesc: 'Formalités accélérées de retour d\'urgence',
      legalTitle: 'Consultation Confidentielle',
      legalDesc: 'Assistance juridique sans crainte et sous anonymat',
      newbornTitle: 'Enregistrement Nouveau-nés',
      newbornDesc: 'Protection légale des enfants contre l\'apatridie',
      healthTitle: 'Urgences Santé & Droits',
      healthDesc: 'Accès aux soins d\'urgence et Croissant-Rouge',
      voiceTitle: 'Assistance Vocale Directe',
      voiceDesc: 'Exprimez votre situation à la voix sans écrire'
    },

    laissezPasserSection: {
      title: 'Guide Administratif: Laissez-Passer & Documents',
      subtitle: 'Procédures pour laissez-passer d\'urgence, renouvellement de passeport et immatriculation consulaire',
      checklistTitle: 'Liste de contrôle des pièces à fournir (Cochez vos pièces prêtes)',
      emergencyNotice: 'Avis humanitaire: Pour les rapatriements sanitaires, urgences familiales ou pertes de papiers, traitement prioritaire immédiat.',
      tabs: {
        laissez_passer: 'Laissez-Passer de Voyage',
        passport: 'Passeport Biométrique',
        immatriculation: 'Immatriculation Consulaire',
        loss_theft: 'Déclaration de Perte / Vol'
      },
      validity: 'Validité:',
      processingTime: 'Délai de traitement:',
      fee: 'Frais consulaires:',
      requirements: 'Pièces requises:'
    },

    legalSection: {
      title: 'Formulaire de Consultation Juridique & Protection',
      subtitle: 'Espace sécurisé et confidentiel pour signalements administratifs, rétentions ou litiges du travail',
      confidentialityNotice: '🔒 Confidentialité absolue: Vos données restent strictement protégées. Vous pouvez effectuer votre demande sous un pseudonyme.',
      fullName: 'Nom et Prénom (ou Pseudonyme)',
      anonymousMode: 'Demande Anonyme (Sous pseudonyme)',
      phone: 'Téléphone de contact / WhatsApp',
      wilaya: 'Wilaya / Ville de résidence actuelle',
      category: 'Type de situation ou litige',
      categories: {
        regularization: 'Régularisation administrative et séjour',
        detention: 'Assistance garde à vue / membre de famille retenu',
        work_dispute: 'Litige de travail / salaires impayés',
        lost_papers: 'Documents confisqués ou perdus',
        humanitarian: 'Détresse humanitaire / maladie / vulnérabilité',
        other: 'Autre question consulaire'
      },
      description: 'Détaillez votre situation avec précision',
      submitBtn: 'Envoyer la demande en toute confidentialité',
      sendingWhatsApp: 'Ouvrir WhatsApp pour transmission directe au Consul',
      successMessage: 'Votre demande a été enregistrée! Notez votre code de suivi:'
    },

    civilStatusSection: {
      title: 'État Civil & Protection des Nouveau-nés',
      subtitle: 'Enregistrement des naissances au Sud algérien pour délivrance d\'actes consulaires et lutte contre l\'apatridie',
      importance: '🛡️ Importance capitale: Déclarer votre enfant dans les 30 jours garantit sa nationalité tchadienne, son passeport futur et ses droits fondamentaux.',
      childName: 'Nom et Prénoms de l\'enfant',
      gender: 'Sexe de l\'enfant',
      male: 'Garçon',
      female: 'Fille',
      birthDate: 'Date de naissance',
      birthPlace: 'Lieu de naissance (Hôpital, clinique ou domicile)',
      fatherName: 'Nom complet du père et nationalité',
      motherName: 'Nom complet de la mère et nationalité',
      certificateNumber: 'N° du Certificat d\'accouchement hospitalier',
      phone: 'Téléphone du parent référent',
      submitBtn: 'Enregistrer au registre consulaire provisoire',
      success: 'Données du nouveau-né enregistrées localement dans votre coffre sécurisé.'
    },

    healthcareSection: {
      title: 'Droits Sanitaires & Soins d\'Urgence dans le Sud',
      subtitle: 'Accès aux soins vitaux, accouchement et réseau d\'aide humanitaire',
      urgentRight: '⚖️ Droit garanti: La loi algérienne sur la santé assure l\'accès gratuit et sans condition de papiers aux urgences vitales et à la maternité.',
      hospitals: [
        {
          name: 'Établissement Public Hospitalier de Tamanrasset (Hôpital Mixte)',
          address: 'Centre-ville de Tamanrasset',
          phone: '029 34 50 50',
          type: 'Urgences médico-chirurgicales et Maternité'
        },
        {
          name: 'Croissant-Rouge Algérien (Comité de Wilaya de Tamanrasset)',
          address: 'Quartier Adrien, Tamanrasset',
          phone: '029 32 18 19',
          type: 'Aide humanitaire d\'urgence, colis, premiers secours'
        },
        {
          name: 'Polyclinique Tahabort',
          address: 'Quartier Tahabort, Tamanrasset',
          phone: '029 34 22 10',
          type: 'Soins de proximité, vaccinations, pédiatrie'
        },
        {
          name: 'Hôpital Frontalier d\'In Guezzam',
          address: 'In Guezzam, Zone frontalière',
          phone: '029 30 11 20',
          type: 'Urgences transfrontalières et évacuations'
        }
      ]
    },

    voiceAssistant: {
      title: 'Assistance Vocale & Dictée Directe',
      subtitle: 'Si vous préférez parler plutôt qu\'écrire, enregistrez votre message et transmettez-le directement par WhatsApp au Consul Honoraire',
      recordInstruction: 'Appuyez pour enregistrer dans votre dialecte ou en français',
      recording: 'Enregistrement en cours... Parlez clairement',
      recordButton: 'Démarrer l\'enregistrement vocal',
      stopButton: 'Arrêter et écouter le message',
      sendViaWhatsApp: 'Envoyer le message au Consul sur WhatsApp',
      readAloud: 'Écouter la lecture audio de cette page'
    },

    offlineVault: {
      title: 'Mon Dossier Consulaire Hors-Ligne',
      subtitle: 'Vos démarches et déclarations restent sauvegardées sur cet appareil même sans connexion internet',
      empty: 'Aucune démarche enregistrée pour le moment.',
      exportCode: 'Exporter / Copier le code APK complet (index.html)',
      exportSuccess: 'Code complet copié avec succès dans le presse-papiers.'
    },

    sosModal: {
      title: 'Alerte & Urgence Vitale (SOS)',
      warning: 'Réservé aux urgences absolues: accident dans le désert, arrestation imminente, détresse vitale.',
      consulDirect: 'Appel Direct au Candidat Consul Honoraire',
      civilProtection: 'Protection Civile Algérienne (Ambulances): 14',
      police: 'Police Algérienne: 17 ou 1548',
      samu: 'Urgences Médicales (SAMU): 3015',
      gpsCoords: 'Coordonnées GPS Désert:',
      gettingGps: 'Localisation GPS désertique en cours...',
      sendGpsWhatsapp: 'Envoyer ma position GPS d\'urgence via WhatsApp'
    }
  }
};
