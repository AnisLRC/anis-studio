import { ErrorBoundary } from '../ErrorBoundary'
import FAQSection from '../sections/FAQSection'
import type { FAQItem } from '../sections/FAQSection'

interface FAQPageProps {
  language: 'hr' | 'en'
}

const GLOBAL_FAQ_ITEMS: FAQItem[] = [
  {
    id: 7,
    category: 'global',
    question: {
      hr: 'Kako izgleda suradnja od prvog upita do gotovog projekta?',
      en: 'How does collaboration look from the first inquiry to the finished project?'
    },
    answer: {
      hr: 'Suradnja započinje prvim kontaktom (forma / e-mail / Instagram), nakon čega slijedi kratko upoznavanje i pitanja o prostoru/webu/biznisu. Zatim pripremam prijedlog paketa i rokova, radim na konceptu, provodim dorade, te na kraju šaljem završne materijale i upute za sljedeće korake.',
      en: 'Collaboration starts with the first contact (form / email / Instagram), followed by a brief introduction and questions about the space/web/business. Then I prepare a package proposal and deadlines, work on the concept, conduct revisions, and finally send final materials and instructions for next steps.'
    }
  },
  {
    id: 8,
    category: 'global',
    question: {
      hr: 'Radite li samo u Zagrebu ili i online / na daljinu?',
      en: 'Do you work only in Zagreb or also online / remotely?'
    },
    answer: {
      hr: 'Radim i uživo i online, ovisno o usluzi: interijeri → kombinacija online + dolazak na prostor (kad je moguće), LRC → radionice uglavnom uživo, dio komunikacije/materijala online, web → sve se može odraditi potpuno na daljinu.',
      en: 'I work both in person and online, depending on the service: interiors → combination of online + site visit (when possible), LRC → workshops mainly in person, part of communication/materials online, web → everything can be done completely remotely.'
    }
  },
  {
    id: 9,
    category: 'global',
    question: {
      hr: 'Kako funkcionira plaćanje i rate?',
      en: 'How does payment and installments work?'
    },
    answer: {
      hr: 'Manje usluge (radionica i sl.) → plaćanje unaprijed. Veći projekti (interijeri, web) → plaćanje po fazama: predujam za rezervaciju termina, druga rata nakon odobrenja koncepta, zadnja rata prije isporuke finalnih materijala.',
      en: 'Smaller services (workshop etc.) → payment in advance. Larger projects (interiors, web) → payment in installments: advance payment for reservation, second installment after concept approval, final installment before delivery of final materials.'
    }
  },
  {
    id: 10,
    category: 'global',
    question: {
      hr: 'Koliko unaprijed se trebam javiti da bih osigurala termin?',
      en: 'How far in advance should I contact you to secure a time slot?'
    },
    answer: {
      hr: 'Za interijere → idealno 2–3 mjeseca prije radova ili narudžbe namještaja. Za web → 1–2 mjeseca prije željenog lansiranja. Za radionice → čim najavim novi ciklus, mjesta se znaju brzo popuniti.',
      en: 'For interiors → ideally 2–3 months before work or furniture order. For web → 1–2 months before desired launch. For workshops → as soon as I announce a new cycle, places tend to fill up quickly.'
    }
  },
  {
    id: 11,
    category: 'global',
    question: {
      hr: 'Što ako trebam više izmjena od onoga što je uključeno u paket?',
      en: 'What if I need more revisions than what is included in the package?'
    },
    answer: {
      hr: 'Svaki paket ima uključeni broj krugova izmjena (u ponudi). Manje kozmetičke izmjene obično stanu u taj okvir. Veće promjene (drugi stil, druga organizacija) tretiramo kao dodatnu mini-fazu uz prethodni dogovor.',
      en: 'Each package includes a number of revision rounds (in the offer). Minor cosmetic changes usually fit within that framework. Larger changes (different style, different organization) are treated as an additional mini-phase with prior agreement.'
    }
  },
  {
    id: 12,
    category: 'global',
    question: {
      hr: 'Što ako usput shvatim da možda trebam drugačiju uslugu?',
      en: 'What if I realize along the way that I might need a different service?'
    },
    answer: {
      hr: 'Suradnju gradimo korak po korak. Ako vidimo da vam ne treba puni paket, možemo ga suziti (npr. samo konzultacije, samo raspored, samo nekoliko stranica weba). Ako odustanete prije početka rada → zadržava se samo predujam. Ako odustanete nakon što je dio posla već odrađen → naplaćuje se odrađeni dio.',
      en: 'We build collaboration step by step. If we see that you don\'t need the full package, we can reduce it (e.g., only consultations, only layout, only a few web pages). If you cancel before work begins → only the advance payment is retained. If you cancel after part of the work is already done → the completed part is charged.'
    }
  },
  {
    id: 13,
    category: 'global',
    question: {
      hr: 'Kako izgleda komunikacija tijekom projekta?',
      en: 'How does communication look during the project?'
    },
    answer: {
      hr: 'E-mail za službenu komunikaciju i slanje materijala. WhatsApp / Viber / Slack za brze provjere (po dogovoru). Zoom / Google Meet za ključne faze (brief, prezentacija koncepta, završni walkthrough). Na početku dogovaramo glavni kanal i okvirni ritam javljanja.',
      en: 'Email for official communication and sending materials. WhatsApp / Viber / Slack for quick checks (by agreement). Zoom / Google Meet for key phases (brief, concept presentation, final walkthrough). At the beginning, we agree on the main channel and approximate communication rhythm.'
    }
  }
]

export default function FAQPage({ language }: FAQPageProps) {
  return (
    <main className="px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <ErrorBoundary name="FAQ">
          <FAQSection language={language} items={GLOBAL_FAQ_ITEMS} hideTitle={false} />
        </ErrorBoundary>
      </div>
    </main>
  )
}

