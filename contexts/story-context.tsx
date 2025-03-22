"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useLanguage, type Language } from "@/contexts/language-context";

// Define story types
export type StoryId =
  | "samudra-manthan"
  | "ganesha-birth"
  | "krishna-kaliya"
  | "ramayana-exile"
  | "ganga-descent"
  | "savitri-satyavan"
  | "narasimha";

export interface StoryPage {
  content: string;
  image: string;
}

export interface Story {
  id: StoryId;
  title: string;
  description: string;
  coverImage: string;
  totalPages: number;
  pages: StoryPage[];
  completed?: boolean;
  progress?: number;
}

interface StoryContextType {
  stories: Record<StoryId, Story>;
  currentStoryId: StoryId | null;
  setCurrentStoryId: (id: StoryId | null) => void;
  getUserProgress: (storyId: StoryId) => number;
  markPageCompleted: (storyId: StoryId, page: number) => void;
  getCompletedStories: () => StoryId[];
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

// All stories data with translations
const getStories = (language: Language): Record<StoryId, Story> => {
  const stories: Record<StoryId, Story> = {
    "samudra-manthan": {
      id: "samudra-manthan",
      title: language === "en" ? "The Churning of the Ocean" : "समुद्र मंथन",
      description:
        language === "en"
          ? "The story of how gods and demons churned the cosmic ocean to obtain the nectar of immortality."
          : "देवताओं और असुरों ने अमरता के अमृत को प्राप्त करने के लिए कैसे समुद्र का मंथन किया, इसकी कहानी।",
      coverImage: "/placeholder.svg?height=300&width=500",
      totalPages: 5,
      pages:
        language === "en"
          ? [
              {
                content:
                  "Long ago, the devas (gods) and asuras (demons) sought the nectar of immortality. Lord Vishnu suggested they churn the cosmic ocean to obtain it.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "Mount Mandara was used as the churning rod, and the serpent Vasuki became the rope. The devas held the tail while the asuras held the head.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "As they churned, many treasures emerged from the ocean. First came Kamadhenu, the wish-fulfilling cow, followed by Uchaishravas, the white horse.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "Then came Airavata, the white elephant, and the Apsaras, celestial maidens. The goddess Lakshmi also emerged, seated on a lotus flower.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "Finally, Dhanvantari appeared with the pot of amrita, the nectar of immortality. After a great struggle, the devas managed to secure the nectar for themselves.",
                image: "/placeholder.svg?height=300&width=500",
              },
            ]
          : [
              {
                content:
                  "बहुत समय पहले, देवताओं और असुरों ने अमृत की खोज की। भगवान विष्णु ने सुझाव दिया कि वे इसे प्राप्त करने के लिए समुद्र का मंथन करें।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "मंदार पर्वत को मंथन दंड के रूप में उपयोग किया गया, और वासुकि नाग रस्सी बन गया। देवताओं ने पूंछ पकड़ी जबकि असुरों ने सिर पकड़ा।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "जैसे-जैसे वे मंथन करते गए, समुद्र से कई रत्न निकले। सबसे पहले कामधेनु, इच्छापूर्ति करने वाली गाय, उसके बाद उच्चैश्रवा, सफेद घोड़ा निकला।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "फिर ऐरावत, सफेद हाथी, और अप्सराएँ, स्वर्गीय कन्याएँ निकलीं। देवी लक्ष्मी भी कमल के फूल पर बैठी हुई प्रकट हुईं।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "अंत में, धन्वंतरि अमृत के कलश के साथ प्रकट हुए। एक बड़े संघर्ष के बाद, देवता अमृत को अपने लिए सुरक्षित करने में सफल हुए।",
                image: "/placeholder.svg?height=300&width=500",
              },
            ],
    },

    "ganesha-birth": {
      id: "ganesha-birth",
      title: language === "en" ? "The Birth of Ganesha" : "गणेश का जन्म",
      description:
        language === "en"
          ? "The story of how Lord Ganesha, the elephant-headed god, came into being."
          : "भगवान गणेश, हाथी के सिर वाले देवता, कैसे अस्तित्व में आए, इसकी कहानी।",
      coverImage: "/placeholder.svg?height=300&width=500",
      totalPages: 5,
      pages:
        language === "en"
          ? [
              {
                content:
                  "Once, Goddess Parvati was preparing for a bath and needed someone to guard the entrance. She created a boy from the turmeric paste she had applied to her body.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "Parvati instructed the boy not to allow anyone to enter while she bathed. The boy, dutiful and strong, stood guard at the entrance.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "When Lord Shiva returned home, he was stopped by the boy. Unaware that this was his son, and angered by being denied entry to his own home, Shiva severed the boy's head.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "Parvati was devastated and demanded Shiva restore their son to life. Shiva promised to replace the boy's head with that of the first creature he encountered facing north.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "The first creature was an elephant. Shiva attached the elephant's head to the boy's body, bringing him back to life. He named him Ganesha and made him the lord of new beginnings and remover of obstacles.",
                image: "/placeholder.svg?height=300&width=500",
              },
            ]
          : [
              {
                content:
                  "एक बार, देवी पार्वती स्नान की तैयारी कर रही थीं और उन्हें प्रवेश द्वार की रक्षा के लिए किसी की आवश्यकता थी। उन्होंने अपने शरीर पर लगाए हल्दी के पेस्ट से एक लड़के का निर्माण किया।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "पार्वती ने लड़के को निर्देश दिया कि जब वह स्नान करें तो किसी को भी प्रवेश न करने दें। कर्तव्यनिष्ठ और मजबूत लड़का प्रवेश द्वार पर पहरा देने लगा।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "जब भगवान शिव घर लौटे, तो लड़के ने उन्हें रोक दिया। यह नहीं जानते हुए कि यह उनका पुत्र है, और अपने ही घर में प्रवेश से मना किए जाने पर क्रोधित होकर, शिव ने लड़के का सिर काट दिया।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "पार्वती दुखी हुईं और शिव से अपने पुत्र को जीवन में वापस लाने की मांग की। शिव ने वादा किया कि वे लड़के के सिर को पहले उत्तर की ओर मुख करके मिलने वाले प्राणी के सिर से बदल देंगे।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "पहला प्राणी एक हाथी था। शिव ने हाथी का सिर लड़के के शरीर से जोड़ दिया, उसे जीवन में वापस ला दिया। उन्होंने उसका नाम गणेश रखा और उसे नई शुरुआत का स्वामी और बाधाओं को दूर करने वाला बनाया।",
                image: "/placeholder.svg?height=300&width=500",
              },
            ],
    },

    "krishna-kaliya": {
      id: "krishna-kaliya",
      title: language === "en" ? "Krishna and Kaliya" : "कृष्ण और कालिया",
      description:
        language === "en"
          ? "The tale of how young Krishna subdued the poisonous serpent Kaliya who was terrorizing the river Yamuna."
          : "कैसे युवा कृष्ण ने विषैले सर्प कालिया को वश में किया जो यमुना नदी को आतंकित कर रहा था, इसकी कहानी।",
      coverImage: "/placeholder.svg?height=300&width=500",
      totalPages: 4,
      pages:
        language === "en"
          ? [
              {
                content:
                  "In the village of Vrindavan, a poisonous serpent named Kaliya lived in the Yamuna river. The water became so toxic that trees and plants on the banks withered, and anyone who went near risked death.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "One day, young Krishna was playing with his friends when their ball fell into the river. Krishna jumped into the water to retrieve it, despite warnings from his friends.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "Kaliya emerged from the depths and wrapped his coils around Krishna. The village watched in horror. But Krishna began to grow in size, forcing the serpent to loosen his grip.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "Krishna then jumped onto Kaliya's many hoods and began to dance. His feet pounded the serpent's heads, humbling his pride. Kaliya's wives begged Krishna for mercy. Krishna spared Kaliya but banished him from the Yamuna to the ocean, making the river safe again.",
                image: "/placeholder.svg?height=300&width=500",
              },
            ]
          : [
              {
                content:
                  "वृंदावन गांव में, कालिया नामक एक विषैला सर्प यमुना नदी में रहता था। पानी इतना जहरीला हो गया था कि किनारों पर पेड़ और पौधे सूख गए थे, और जो कोई भी पास जाता था, उसकी मृत्यु का खतरा था।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "एक दिन, युवा कृष्ण अपने दोस्तों के साथ खेल रहे थे जब उनकी गेंद नदी में गिर गई। अपने दोस्तों की चेतावनियों के बावजूद, कृष्ण उसे वापस लाने के लिए पानी में कूद गए।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "कालिया गहराई से निकला और अपने कुंडल कृष्ण के चारों ओर लपेट दिए। गांव ने भय से देखा। लेकिन कृष्ण आकार में बढ़ने लगे, जिससे सर्प को अपनी पकड़ ढीली करने के लिए मजबूर होना पड़ा।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "फिर कृष्ण कालिया के कई फनों पर कूद गए और नाचने लगे। उनके पैरों ने सर्प के सिरों को कुचल दिया, उसके अहंकार को नष्ट कर दिया। कालिया की पत्नियों ने कृष्ण से दया की भीख मांगी। कृष्ण ने कालिया को बख्श दिया लेकिन उसे यमुना से समुद्र में जाने का आदेश दिया, जिससे नदी फिर से सुरक्षित हो गई।",
                image: "/placeholder.svg?height=300&width=500",
              },
            ],
    },

    "ramayana-exile": {
      id: "ramayana-exile",
      title: language === "en" ? "Ramayana: The Exile" : "रामायण: वनवास",
      description:
        language === "en"
          ? "The story of Lord Rama's exile to the forest for fourteen years."
          : "भगवान राम के चौदह वर्षों के लिए वन में निर्वासन की कहानी।",
      coverImage: "/placeholder.svg?height=300&width=500",
      totalPages: 5,
      pages:
        language === "en"
          ? [
              {
                content:
                  "King Dasharatha of Ayodhya had four sons: Rama, Lakshmana, Bharata, and Shatrughna. Rama, the eldest, was to be crowned king. The kingdom rejoiced at the news of his coronation.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "However, Dasharatha's youngest wife Kaikeyi was influenced by her maid Manthara. She reminded the king of two boons he had promised her years ago, and demanded that Rama be exiled for fourteen years and her son Bharata be crowned instead.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "Bound by his promise, a heartbroken Dasharatha agreed. Rama, ever dutiful, accepted his father's decision without complaint. His wife Sita and brother Lakshmana insisted on accompanying him to the forest.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "When Bharata returned from his visit to relatives and learned what had happened, he was furious with his mother. He went to the forest to bring Rama back, but Rama refused, insisting on honoring their father's word.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "Bharata then took Rama's sandals and placed them on the throne, ruling Ayodhya as Rama's representative until his return. Meanwhile, Rama, Sita, and Lakshmana began their life in the forest, facing many adventures and challenges.",
                image: "/placeholder.svg?height=300&width=500",
              },
            ]
          : [
              {
                content:
                  "अयोध्या के राजा दशरथ के चार पुत्र थे: राम, लक्ष्मण, भरत और शत्रुघ्न। सबसे बड़े राम को राजा बनाया जाना था। उनके राज्याभिषेक की खबर से राज्य में खुशी छा गई।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "हालांकि, दशरथ की सबसे छोटी पत्नी कैकेयी अपनी दासी मंथरा से प्रभावित हुईं। उन्होंने राजा को याद दिलाया कि उन्होंने वर्षों पहले उन्हें दो वरदान देने का वादा किया था, और मांग की कि राम को चौदह वर्षों के लिए वनवास दिया जाए और उनके पुत्र भरत को राजा बनाया जाए।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "अपने वादे से बंधे, एक दिल टूटे दशरथ ने सहमति दे दी। राम, हमेशा कर्तव्यनिष्ठ, अपने पिता के फैसले को बिना शिकायत के स्वीकार कर लिया। उनकी पत्नी सीता और भाई लक्ष्मण ने वन में उनके साथ जाने का आग्रह किया।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "जब भरत रिश्तेदारों के यहां से लौटे और उन्हें पता चला कि क्या हुआ है, तो वे अपनी मां से नाराज हो गए। वे राम को वापस लाने के लिए वन गए, लेकिन राम ने इनकार कर दिया, अपने पिता के वचन का सम्मान करने पर जोर दिया।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "भरत ने फिर राम के चरण पादुका को लिया और उन्हें सिंहासन पर रखा, राम के प्रतिनिधि के रूप में उनके लौटने तक अयोध्या पर शासन किया। इस बीच, राम, सीता और लक्ष्मण ने वन में अपना जीवन शुरू किया, कई साहसिक कार्यों और चुनौतियों का सामना किया।",
                image: "/placeholder.svg?height=300&width=500",
              },
            ],
    },

    "ganga-descent": {
      id: "ganga-descent",
      title: language === "en" ? "The Descent of Ganga" : "गंगा का अवतरण",
      description:
        language === "en"
          ? "The story of how the sacred river Ganga descended from the heavens to Earth."
          : "पवित्र नदी गंगा स्वर्ग से पृथ्वी पर कैसे उतरी, इसकी कहानी।",
      coverImage: "/placeholder.svg?height=300&width=500",
      totalPages: 4,
      pages:
        language === "en"
          ? [
              {
                content:
                  "King Sagara of Ayodhya performed a horse sacrifice to prove his supremacy. His 60,000 sons followed the sacrificial horse, but it was stolen by Lord Indra and hidden in the ashram of Sage Kapila.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "Sagara's sons accused the sage of theft and disturbed his meditation. Angered, Kapila reduced them to ashes with his spiritual power. Sagara's grandson Anshuman, and later his great-grandson Dilip, tried unsuccessfully to find a way to bring salvation to their ancestors.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "Finally, Dilip's son Bhagiratha performed severe penances to please Lord Brahma, who agreed to send the heavenly river Ganga to Earth. However, the force of Ganga's descent would shatter the Earth, so Bhagiratha prayed to Lord Shiva to break her fall.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "Shiva agreed and caught Ganga in his matted locks, releasing her gently onto Earth. Bhagiratha led Ganga to the place where his ancestors' ashes lay. The sacred waters of Ganga touched the ashes, purifying the souls of Sagara's sons and allowing them to ascend to heaven.",
                image: "/placeholder.svg?height=300&width=500",
              },
            ]
          : [
              {
                content:
                  "अयोध्या के राजा सगर ने अपनी श्रेष्ठता साबित करने के लिए एक अश्वमेध यज्ञ किया। उनके 60,000 पुत्रों ने यज्ञ के घोड़े का अनुसरण किया, लेकिन इंद्र देव ने इसे चुरा लिया और ऋषि कपिल के आश्रम में छिपा दिया।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "सगर के पुत्रों ने ऋषि पर चोरी का आरोप लगाया और उनके ध्यान में बाधा डाली। क्रोधित होकर, कपिल ने अपनी आध्यात्मिक शक्ति से उन्हें भस्म कर दिया। सगर के पोते अंशुमान, और बाद में उनके परपोते दिलीप ने, अपने पूर्वजों को मोक्ष दिलाने का रास्ता खोजने की असफल कोशिश की।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "अंत में, दिलीप के पुत्र भगीरथ ने ब्रह्मा को प्रसन्न करने के लिए कठोर तपस्या की, जिन्होंने स्वर्गीय नदी गंगा को पृथ्वी पर भेजने के लिए सहमति दी। हालांकि, गंगा के उतरने के वेग से पृथ्वी टूट जाती, इसलिए भगीरथ ने भगवान शिव से उसके गिरने को रोकने की प्रार्थना की।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "शिव ने सहमति दी और गंगा को अपनी जटाओं में पकड़ लिया, उसे धीरे से पृथ्वी पर छोड़ दिया। भगीरथ गंगा को उस स्थान पर ले गए जहां उनके पूर्वजों की राख थी। गंगा के पवित्र जल ने राख को छुआ, सगर के पुत्रों की आत्माओं को शुद्ध किया और उन्हें स्वर्ग जाने की अनुमति दी।",
                image: "/placeholder.svg?height=300&width=500",
              },
            ],
    },

    "savitri-satyavan": {
      id: "savitri-satyavan",
      title: language === "en" ? "Savitri and Satyavan" : "सावित्री और सत्यवान",
      description:
        language === "en"
          ? "The tale of Princess Savitri who saved her husband from the god of death through her devotion and intelligence."
          : "राजकुमारी सावित्री की कहानी जिन्होंने अपने पति को मृत्यु के देवता से अपनी भक्ति और बुद्धि के माध्यम से बचाया।",
      coverImage: "/placeholder.svg?height=300&width=500",
      totalPages: 5,
      pages:
        language === "en"
          ? [
              {
                content:
                  "Princess Savitri was beautiful and wise. When it came time for her to choose a husband, she selected Satyavan, the son of a blind king who lived in exile in the forest. The sage Narada warned her that Satyavan was destined to die in one year.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "Despite knowing his fate, Savitri married Satyavan and went to live with him in the forest. She served her in-laws and husband with devotion. As the prophesied day approached, she observed a three-day fast and prayer.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "On the fated day, Satyavan went to cut wood in the forest with Savitri by his side. While working, he felt dizzy and lay down with his head in Savitri's lap. At that moment, Yama, the god of death, appeared to take Satyavan's soul.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "As Yama carried away Satyavan's soul, Savitri followed. Impressed by her devotion, Yama granted her any boon except her husband's life. Savitri cleverly asked for blessings that indirectly required Satyavan to be alive.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "Finally, Savitri asked for a hundred sons, which Yama granted before realizing that she would need her husband alive to fulfill this wish. Outwitted, Yama returned Satyavan's soul. When Satyavan awoke, they returned home where they lived a long and happy life together.",
                image: "/placeholder.svg?height=300&width=500",
              },
            ]
          : [
              {
                content:
                  "राजकुमारी सावित्री सुंदर और बुद्धिमान थीं। जब उनके पति चुनने का समय आया, तो उन्होंने सत्यवान का चयन किया, जो एक अंधे राजा के पुत्र थे जो वन में निर्वासन में रहते थे। ऋषि नारद ने उन्हें चेतावनी दी कि सत्यवान का भाग्य एक वर्ष में मृत्यु होना था।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "उनके भाग्य को जानते हुए भी, सावित्री ने सत्यवान से विवाह किया और वन में उनके साथ रहने गईं। उन्होंने अपने सास-ससुर और पति की भक्ति से सेवा की। जैसे-जैसे भविष्यवाणी का दिन नजदीक आया, उन्होंने तीन दिन का उपवास और प्रार्थना की।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "निर्धारित दिन पर, सत्यवान सावित्री के साथ वन में लकड़ी काटने गए। काम करते समय, उन्हें चक्कर आया और वे सावित्री की गोद में सिर रखकर लेट गए। उसी क्षण, यम, मृत्यु के देवता, सत्यवान की आत्मा लेने के लिए प्रकट हुए।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "जैसे ही यम सत्यवान की आत्मा ले जा रहे थे, सावित्री उनके पीछे चली गईं। उनकी भक्ति से प्रभावित होकर, यम ने उन्हें उनके पति के जीवन को छोड़कर कोई भी वरदान मांगने की अनुमति दी। सावित्री ने चतुराई से ऐसे आशीर्वाद मांगे जिनके लिए अप्रत्यक्ष रूप से सत्यवान का जीवित होना आवश्यक था।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "अंत में, सावित्री ने सौ पुत्रों का वरदान मांगा, जिसे यम ने यह एहसास करने से पहले दे दिया कि इस इच्छा को पूरा करने के लिए उसे अपने पति को जीवित रखने की आवश्यकता होगी। चतुराई से हारकर, यम ने सत्यवान की आत्मा लौटा दी। जब सत्यवान जागे, तो वे घर लौट आए जहां उन्होंने एक साथ लंबा और खुशहाल जीवन जिया।",
                image: "/placeholder.svg?height=300&width=500",
              },
            ],
    },

    narasimha: {
      id: "narasimha",
      title: language === "en" ? "The Story of Narasimha" : "नरसिंह की कथा",
      description:
        language === "en"
          ? "The tale of Lord Vishnu's incarnation as half-man, half-lion to defeat the demon king Hiranyakashipu."
          : "भगवान विष्णु के आधे मनुष्य, आधे सिंह के रूप में असुर राजा हिरण्यकशिपु को हराने के लिए अवतार लेने की कहानी।",
      coverImage: "/placeholder.svg?height=300&width=500",
      totalPages: 4,
      pages:
        language === "en"
          ? [
              {
                content:
                  "The demon king Hiranyakashipu performed severe penances to please Lord Brahma. Impressed, Brahma granted him a boon. Hiranyakashipu cleverly asked to not be killed by human or animal, neither indoors nor outdoors, neither during day nor night, neither on land nor in air, and by no weapon.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "With this near-immortality, Hiranyakashipu became arrogant and demanded everyone worship him instead of the gods. However, his own son Prahlada remained devoted to Lord Vishnu. This enraged Hiranyakashipu, who subjected Prahlada to numerous tortures, but the boy was always miraculously saved.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "One day, in frustration, Hiranyakashipu pointed to a pillar and asked Prahlada if his Lord Vishnu was present even there. When Prahlada said yes, the king struck the pillar with his mace. At that moment, Lord Vishnu emerged from the pillar in the form of Narasimha - half-man, half-lion.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "It was twilight - neither day nor night. Narasimha carried Hiranyakashipu to the threshold of the palace - neither indoors nor outdoors. He placed the demon on his lap - neither on land nor in air. Using his claws - not a weapon - Narasimha, who was neither human nor animal, tore apart Hiranyakashipu, thus upholding Brahma's boon while still delivering justice.",
                image: "/placeholder.svg?height=300&width=500",
              },
            ]
          : [
              {
                content:
                  "असुर राजा हिरण्यकशिपु ने ब्रह्मा को प्रसन्न करने के लिए कठोर तपस्या की। प्रभावित होकर, ब्रह्मा ने उसे एक वरदान दिया। हिरण्यकशिपु ने चतुराई से मांगा कि उसे न तो मनुष्य न ही पशु द्वारा, न अंदर न बाहर, न दिन न रात, न जमीन पर न हवा में, और किसी भी हथियार से न मारा जाए।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "इस लगभग अमरत्व के साथ, हिरण्यकशिपु अहंकारी हो गया और सभी से देवताओं के बजाय उसकी पूजा करने की मांग की। हालांकि, उसका अपना पुत्र प्रह्लाद भगवान विष्णु का भक्त बना रहा। इससे हिरण्यकशिपु क्रोधित हो गया, जिसने प्रह्लाद को कई यातनाएं दीं, लेकिन लड़का हमेशा चमत्कारिक रूप से बच जाता था।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "एक दिन, निराशा में, हिरण्यकशिपु ने एक स्तंभ की ओर इशारा करते हुए प्रह्लाद से पूछा कि क्या उसका भगवान विष्णु वहां भी मौजूद है। जब प्रह्लाद ने हां कहा, तो राजा ने अपने गदा से स्तंभ पर प्रहार किया। उसी क्षण, भगवान विष्णु स्तंभ से नरसिंह के रूप में - आधे मनुष्य, आधे सिंह - प्रकट हुए।",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                content:
                  "यह संध्या का समय था - न दिन न रात। नरसिंह हिरण्यकशिपु को महल की देहरी पर ले गए - न अंदर न बाहर। उन्होंने असुर को अपनी गोद में रखा - न जमीन पर न हवा में। अपने नाखूनों का उपयोग करके - जो हथियार नहीं थे - नरसिंह ने, जो न मनुष्य थे न पशु, हिरण्यकशिपु को फाड़ दिया, इस प्रकार ब्रह्मा के वरदान का पालन करते हुए भी न्याय दिया।",
                image: "/placeholder.svg?height=300&width=500",
              },
            ],
    },
  };

  return stories;
};

// Create the provider component
export function StoryProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const [stories, setStories] = useState<Record<StoryId, Story>>(
    getStories(language)
  );
  const [currentStoryId, setCurrentStoryId] = useState<StoryId | null>(null);

  // Update stories when language changes
  useEffect(() => {
    setStories(getStories(language));
  }, [language]);

  // Load user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("storyProgress");
    if (savedProgress) {
      const progress = JSON.parse(savedProgress) as Record<StoryId, number>;

      // Update stories with saved progress
      const updatedStories = { ...stories };
      Object.entries(progress).forEach(([id, pageProgress]) => {
        const storyId = id as StoryId;
        if (updatedStories[storyId]) {
          updatedStories[storyId].progress = pageProgress;
          updatedStories[storyId].completed =
            pageProgress >= updatedStories[storyId].totalPages;
        }
      });

      setStories(updatedStories);
    }
  }, []);

  // Get user progress for a story
  const getUserProgress = (storyId: StoryId): number => {
    return stories[storyId]?.progress || 0;
  };

  // Mark a page as completed
  const markPageCompleted = (storyId: StoryId, page: number) => {
    // Get current progress from localStorage
    const savedProgress = localStorage.getItem("storyProgress");
    const progress = savedProgress
      ? (JSON.parse(savedProgress) as Record<StoryId, number>)
      : {};

    // Update progress if the new page is further than the saved progress
    if (!progress[storyId] || progress[storyId] < page) {
      progress[storyId] = page;
      localStorage.setItem("storyProgress", JSON.stringify(progress));

      // Update stories state
      const updatedStories = { ...stories };
      updatedStories[storyId].progress = page;
      updatedStories[storyId].completed =
        page >= updatedStories[storyId].totalPages;

      setStories(updatedStories);
    }
  };

  // Get completed stories
  const getCompletedStories = (): StoryId[] => {
    return Object.entries(stories)
      .filter(([_, story]) => story.completed)
      .map(([id, _]) => id as StoryId);
  };

  return (
    <StoryContext.Provider
      value={{
        stories,
        currentStoryId,
        setCurrentStoryId,
        getUserProgress,
        markPageCompleted,
        getCompletedStories,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
}

// Custom hook to use the story context
export function useStory() {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
}
