import { NextResponse } from 'next/server';

// Enhanced dataset with more common words
const translationDataset = {
  // Basic verbs
  "eat": {
    hindi: "खाना",
    marathi: "खाणे",
    gujarati: "ખાવું",
    tamil: "சாப்பிட",
    kannada: "ತಿನ್ನು",
    telugu: "తినడం",
    bengali: "খাওয়া",
    malayalam: "കഴിക്കുക",
    punjabi: "ਖਾਣਾ",
    odia: "ଖାଇବା"
  },
  "this is our hackathon project": {
  "hindi": "यह हमारी हैकाथॉन परियोजना है",
  "marathi": "हा आमचा हॅकाथॉन प्रकल्प आहे",
  "gujarati": "આ અમારો હેકાથોન પ્રોજેક્ટ છે",
  "tamil": "இது எங்கள் ஹாக்கத்தான் திட்டம்",
  "kannada": "ಇದು ನಮ್ಮ ಹ್ಯಾಕಥಾನ್ ಪ್ರಾಜೆಕ್ಟ್",
  "telugu": "ఇది మా హాకథాన్ ప్రాజెక్ట్",
  "bengali": "এটি আমাদের হ্যাকাথন প্রকল্প",
  "malayalam": "ഇത് നമ്മുടെ ഹാക്കത്തോണ് പ്രോജക്റ്റാണ്",
  "punjabi": "ਇਹ ਸਾਡਾ ਹੈਕਾਥਾਨ ਪ੍ਰਾਜੈਕਟ ਹੈ",
  "odia": "ଏହା ଆମର ହାକାଥନ ପ୍ରକଳ୍ପ"
},"hello world": {
    "hindi": "नमस्ते दुनिया",
    "marathi": "नमस्कार जग",
    "gujarati": "નમસ્તે વિશ્વ",
    "tamil": "ஹலோ உலகம்",
    "kannada": "ಹಲೋ ಪ್ರಪಂಚ",
    "telugu": "హలో ప్రపంచం",
    "bengali": "হ্যালো ওয়ার্ল্ড",
    "malayalam": "ഹലോ വേൾഡ്",
    "punjabi": "ਹੈਲੋ ਦੁਨੀਆ",
    "odia": "ନମସ୍କାର ଜଗତ"
  },
  "how are you": {
    "hindi": "आप कैसे हैं",
    "marathi": "तुमी कसे आहात",
    "gujarati": "તમે કેમ છો",
    "tamil": "நீங்கள் எப்படி இருக்கிறீர்கள்",
    "kannada": "ನೀವು ಹೇಗಿದ್ದೀರಾ",
    "telugu": "మీరు ఎలా ఉన్నారు",
    "bengali": "আপনি কেমন আছেন",
    "malayalam": "നിങ്ങള്‍ എങ്ങനെയുണ്ട്",
    "punjabi": "ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ",
    "odia": "ଆପଣ କେମିତି ଅଛନ୍ତି"
  },
  "good morning": {
    "hindi": "सुप्रभात",
    "marathi": "शुभ प्रभात",
    "gujarati": "સુપ્રભાત",
    "tamil": "காலை வணக்கம்",
    "kannada": "ಶುಭೋದಯ",
    "telugu": "శుభోదయం",
    "bengali": "সuprabhāt",
    "malayalam": "ശുഭോദയം",
    "punjabi": "ਸੁਪ੍ਰਭਾਤ",
    "odia": "ସୁପ୍ରଭାତ"
  },
  "good night": {
    "hindi": "शुभ रात्रि",
    "marathi": "शुभ रात्री",
    "gujarati": "શુભ રાત્રિ",
    "tamil": "இனிய இரவு",
    "kannada": "ಶುಭ ರಾತ್ರಿ",
    "telugu": "శుభ రాత్రి",
    "bengali": "শুভ রাত্রি",
    "malayalam": "ശുഭ രാത്രി",
    "punjabi": "ਸ਼ੁੱਭ ਰਾਤਰੀ",
    "odia": "ଶୁଭ ରାତ୍ରି"
  },
  "welcome": {
    "hindi": "स्वागत है",
    "marathi": "स्वागत आहे",
    "gujarati": "સ્વાગત છે",
    "tamil": "வரவேற்கிறோம்",
    "kannada": "ಸ್ವಾಗತ",
    "telugu": "స్వాగతం",
    "bengali": "স্বাগতম",
    "malayalam": "സ്വാഗതം",
    "punjabi": "ਸੁਆਗਤ ਹੈ",
    "odia": "ସ୍ବାଗତମ୍"
  },
  "thank you": {
    "hindi": "धन्यवाद",
    "marathi": "धन्यवाद",
    "gujarati": "આભાર",
    "tamil": "நன்றி",
    "kannada": "ಧನ್ಯವಾದಗಳು",
    "telugu": "ధన్యవాదాలు",
    "bengali": "ধন্যবাদ",
    "malayalam": "നന്ദി",
    "punjabi": "ਧੰਨਵਾਦ",
    "odia": "ଧନ୍ୟବାଦ"
  },
  "what is your name": {
    "hindi": "आपका नाम क्या है",
    "marathi": "तुझे नाव काय आहे",
    "gujarati": "તમારું નામ શું છે",
    "tamil": "உங்கள் பெயர் என்ன",
    "kannada": "ನಿಮ್ಮ ಹೆಸರೇನು",
    "telugu": "మీ పేరు ఏమిటి",
    "bengali": "তোমার নাম কি",
    "malayalam": "നിങ്ങളുടെ പേര് എന്താണ്",
    "punjabi": "ਤੁਹਾਡਾ ਨਾਂ ਕੀ ਹੈ",
    "odia": "ଆପଣଙ୍କ ନାଆଁ କ'ଣ"
  },
  "nice to meet you": {
    "hindi": "आपसे मिलकर अच्छा लगा",
    "marathi": "तुमच्याशी भेटून आनंद झाला",
    "gujarati": "તમને મળીને આનંદ થયો",
    "tamil": "உங்களை சந்தித்ததில் மகிழ்ச்சி",
    "kannada": "ನಿಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿದಲ್ಲಿ ಸಂತೋಷ",
    "telugu": "మిమ్మల్ని కలవడం ఆనందంగా ఉంది",
    "bengali": "আপনার সাথে দেখা করে ভালো লাগল",
    "malayalam": "നിങ്ങളെ കണ്ടതിൽ സന്തോഷം",
    "punjabi": "ਤੁਹਾਨੂੰ ਮਿਲ ਕੇ ਚੰਗਾ ਲਗਿਆ",
    "odia": "ଆପଣଙ୍କ ସହିତ ମିଳି ଭଲ ଲାଗିଲା"
  },
  "i love reading books": {
    "hindi": "मुझे किताबें पढ़ना पसंद है",
    "marathi": "मला पुस्तके वाचायला आवडतात",
    "gujarati": "મને પુસ્તકો વાંચવાનું ગમે છે",
    "tamil": "நான் புத்தகங்களைப் படிக்க விரும்புகிறேன்",
    "kannada": "ನಾನು ಪುಸ್ತಕಗಳನ್ನು ಓದಲು ಇಷ್ಟಪಡುವೆನು",
    "telugu": "నేను పుస్తకాలు చదవడం ఇష్టపడతాను",
    "bengali": "আমার বই পড়তে ভালো লাগে",
    "malayalam": "എനിക്ക് പുസ്തകങ്ങൾ വായിക്കാൻ ഇഷ്ടമാണ്",
    "punjabi": "ਮੈਨੂੰ ਕਿਤਾਬਾਂ ਪੜ੍ਹਨਾ ਪਸੰਦ ਹੈ",
    "odia": "ମୁଁ ପୁସ୍ତକ ପଢ଼ିବାକୁ ଭଲ ପାଏଁ"
  },
  "where are you from": {
    "hindi": "आप कहाँ से हैं",
    "marathi": "तुम्ही कुठून आला आहात",
    "gujarati": "તમે કયાંથી આવ્યા છો",
    "tamil": "நீங்கள் எங்கு இருந்து வருகிறீர்கள்",
    "kannada": "ನೀವು ಎಲ್ಲಿ ಇರುತ್ತೀರಿ",
    "telugu": "మీరు ఎక్కడి నుండి వచ్చారు",
    "bengali": "আপনি কোথা থেকে এসেছেন",
    "malayalam": "നിങ്ങൾ എവിടെ നിന്ന് എത്തിയിരിക്കുന്നു",
    "punjabi": "ਤੁਸੀਂ ਕਿੱਥੋਂ ਆਏ ਹੋ",
    "odia": "ଆପଣ କେଉଁଠାରୁ ଆସିଛନ୍ତି"
  },
  "i am hungry": {
    "hindi": "मुझे भूख लगी है",
    "marathi": "मला भूक लागली आहे",
    "gujarati": "મને ભૂખ લાગી છે",
    "tamil": "எனக்கு பசிக்கிறது",
    "kannada": "ನನಗೆ ಹಸಿವು ಆಕಲಾಗುತ್ತಿದೆ",
    "telugu": "నాకు ఆకలిగా ఉంది",
    "bengali": "আমার খিদে পেয়েছে",
    "malayalam": "എനിക്ക് വിശക്കുന്നു",
    "punjabi": "ਮੈਨੂੰ ਭੁੱਖ ਲੱਗੀ ਹੈ",
    "odia": "ମୁଁ ଭୁଖି ହେଲିଛି"
  },
    "it is a beautiful day to explore nature": {
      "hindi": "प्रकृति की खोज के लिए यह एक सुंदर दिन है",
      "marathi": "निसर्गाचा शोध घेण्यासाठी आजचा दिवस सुंदर आहे",
      "gujarati": "પ્રકૃતિને શોધવા માટે આજનો દિવસ સુંદર છે",
      "tamil": "இயற்கையை ஆராய சுந்தரமான நாள்",
      "kannada": "ನೈಸರ್ಗಿಕತೆಯನ್ನು ಅನ್ವೇಷಿಸಲು ಇದು ಸುಂದರ ದಿನ",
      "telugu": "ప్రకృతిని అన్వేషించడానికి ఇది ఒక అందమైన రోజు",
      "bengali": "প্রকৃতি অন্বেষণের জন্য এটি একটি সুন্দর দিন",
      "malayalam": "പ്രകൃതിയെ അന്വേഷിക്കാൻ ഇതൊരു മനോഹരമായ ദിവസം",
      "punjabi": "ਕੁਦਰਤ ਦੀ ਖੋਜ ਕਰਨ ਲਈ ਇਹ ਇੱਕ ਸੁੰਦਰ ਦਿਨ ਹੈ",
      "odia": "ପ୍ରକୃତିକୁ ଖୋଜିବା ପାଇଁ ଏହା ଗୋଟିଏ ସୁନ୍ଦର ଦିନ"
    },
    "hard work and determination lead to success": {
      "hindi": "कड़ी मेहनत और दृढ़ संकल्प सफलता की कुंजी है",
      "marathi": "कठोर परिश्रम आणि दृढ निश्चय यशाची गुरुकिल्ली आहे",
      "gujarati": "કઠોર પરિશ્રમ અને દૃઢ નિશ્ચય સફળતાની ચાવી છે",
      "tamil": "கடின உழைப்பு மற்றும் உறுதியான தீர்மானம் வெற்றிக்கான திறவுகோல்",
      "kannada": "ಕಠಿಣ ಪರಿಶ್ರಮ ಮತ್ತು ದೃಢಸಂಕಲ್ಪ ಯಶಸ್ಸಿಗೆ ದಾರಿ ಮಾಡುತ್ತದೆ",
      "telugu": "కష్టపాటు మరియు దృఢ సంకల్పం విజయానికి మార్గం చూపుతుంది",
      "bengali": "কঠোর পরিশ্রম এবং দৃঢ় সংকল্প সাফল্যের চাবিকাঠি",
      "malayalam": "ശ്രമവും দৃഢനിശ്ചയവും വിജയത്തിലേക്ക് നയിക്കുന്നു",
      "punjabi": "ਮਿਹਨਤ ਅਤੇ ਦ੍ਰਿੜਤਾ ਸਫਲਤਾ ਵਲ ਲੈ ਜਾਂਦੇ ਹਨ",
      "odia": "କଠିନ ପରିଶ୍ରମ ଓ ଦୃଢ଼ ସଙ୍କଳ୍ପ ସଫଳତା ଆଣେ"
    },
    "reading expands our knowledge and imagination": {
      "hindi": "पढ़ना हमारे ज्ञान और कल्पना का विस्तार करता है",
      "marathi": "वाचन आमचे ज्ञान आणि कल्पनाशक्ती वाढवते",
      "gujarati": "વાંચન અમારું જ્ઞાન અને કલ્પના વિસ્તરે છે",
      "tamil": "படித்தல் நமது அறிவும் கற்பனையும் விரிவாக்குகிறது",
      "kannada": "ಓದುವಿಕೆ ನಮ್ಮ ಜ್ಞಾನ ಮತ್ತು ಕಲ್ಪನೆಗಳನ್ನು ವಿಸ್ತರಿಸುತ್ತದೆ",
      "telugu": "చదవడం మన జ్ఞానం మరియు ఊహాశక్తిని విస్తరిస్తుంది",
      "bengali": "পড়া আমাদের জ্ঞান এবং কল্পনাকে প্রসারিত করে",
      "malayalam": "വായന ഞങ്ങളുടെ അറിവും സ്വപ്നങ്ങളും വ്യാപിപ്പിക്കുന്നു",
      "punjabi": "ਪੜ੍ਹਾਈ ਸਾਡੇ ਗਿਆਨ ਅਤੇ ਕਲਪਨਾਵਾਂ ਨੂੰ ਵਿਸਤਾਰ ਦਿੰਦੀ ਹੈ",
      "odia": "ପଢ଼ିବା ଆମର ଜ୍ଞାନ ଓ କଳ୍ପନାକୁ ଭିତି ଆଣେ"
    },
    "patience is a virtue that leads to great achievements": {
      "hindi": "धैर्य एक गुण है जो महान उपलब्धियों की ओर ले जाता है",
      "marathi": "धैर्य हा एक गुण आहे जो महान यशाकडे नेतो",
      "gujarati": "ધૈર્ય એ એક ગુણ છે જે મહાન સિદ્ધિઓ તરફ દોરી જાય છે",
      "tamil": "பொறுமை என்பது மிகப்பெரிய சாதனைகளுக்கான குணமாகும்",
      "kannada": "ಸಹನೆ ಒಂದು ಗುಣವಾಗಿದೆ, ಇದು ಮಹಾನ್ ಸಾಧನೆಗಳಿಗೆ ದಾರಿ ಮಾಡುತ್ತದೆ",
      "telugu": "ధైర్యం ఒక గుణం, ఇది గొప్ప విజయాలకు దారి తీస్తుంది",
      "bengali": "ধৈর্য একটি গুণ যা বড় সাফল্যের দিকে নিয়ে যায়",
      "malayalam": "ധൈര്യം മഹത്തായ വിജയങ്ങളിലേക്ക് നയിക്കുന്ന ഒരു ഗുണമാണ്",
      "punjabi": "ਧੀਰਜ ਇੱਕ ਗੁਣ ਹੈ ਜੋ ਮਹਾਨ ਸਫਲਤਾਵਾਂ ਵੱਲ ਲੈ ਜਾਂਦਾ ਹੈ",
      "odia": "ଧୈର୍ଯ ଗୋଟିଏ ଗୁଣ ଯାହା ବଡ଼ ସଫଳତାକୁ ନେଇ ଯାଏ"
    },
    "small steps every day build the path to big goals": {
      "hindi": "हर दिन छोटे कदम बड़े लक्ष्यों का रास्ता बनाते हैं",
      "marathi": "दररोजचे छोटे पाऊल मोठ्या ध्येयाकडे नेते",
      "gujarati": "દરરોજના નાના પગલાં મોટા લક્ષ્યો સુધી પહોંચાડે છે",
      "tamil": "ஒவ்வொரு நாளும் சிறிய படிகள் பெரிய இலக்கை அடைகின்றன",
      "kannada": "ಪ್ರತಿದಿನದ ಚಿಕ್ಕ ಹೆಜ್ಜೆಗಳು ದೊಡ್ಡ ಗುರಿಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತವೆ",
      "telugu": "ప్రతి రోజు చిన్నచిన్న అడుగులు పెద్ద లక్ష్యాలకు మార్గం వేసేలా చేస్తాయి",
      "bengali": "প্রতিদিন ছোট ছোট পদক্ষেপ বড় লক্ষ্য অর্জনের পথ তৈরি করে",
      "malayalam": "പ്രതിവിശ്വാസം ചെറിയ ചുവടുകൾ വലിയ ലക്ഷ്യത്തിലേക്ക് എത്തിക്കുന്നു",
      "punjabi": "ਹਰ ਦਿਨ ਦੇ ਛੋਟੇ ਕਦਮ ਵੱਡੇ ਟੀਚਿਆਂ ਵੱਲ ਲੈ ਜਾਂਦੇ ਹਨ",
      "odia": "ପ୍ରତି ଦିନ ଛୋଟ ଛୋଟ ପଦକ୍ଷେପ ବଡ଼ ଲକ୍ଷ୍ୟକୁ ନେଇଯାଏ"
    },
    "cooking is an art that brings people together": {
      "hindi": "खाना पकाना एक कला है जो लोगों को एक साथ लाती है",
      "marathi": "स्वयंपाक एक कला आहे जी लोकांना एकत्र आणते",
      "gujarati": "ખાવાનું બનાવવું એક કળા છે જે લોકોને એકસાથે લાવે છે",
      "tamil": "சமைத்தல் மனிதர்களை ஒன்றிணைக்கும் கலை",
      "kannada": "ಅಡುಗೆ ಒಂದು ಕಲೆ, ಇದು ಜನರನ್ನು ಒಟ್ಟುಗೂಡಿಸುತ್ತದೆ",
      "telugu": "వంట ఒక కళ, ఇది ప్రజలను కలుపుతుంది",
      "bengali": "রান্না এমন একটি শিল্প যা মানুষকে একত্রিত করে",
      "malayalam": "അടുക്കള കലയാണ്, ഇത് ആളുകളെ ഏകോപിപ്പിക്കുന്നു",
      "punjabi": "ਖਾਣਾ ਬਣਾਉਣਾ ਇੱਕ ਕਲਾ ਹੈ ਜੋ ਲੋਕਾਂ ਨੂੰ ਇੱਕਜੁਟ ਕਰਦਾ ਹੈ",
      "odia": "ରନ୍ଧଣା ଏକ କଳା ଯାହା ଲୋକଙ୍କୁ ଏକତାରେ ଆଣେ"
    },
    "exercise keeps both the mind and body healthy": {
      "hindi": "व्यायाम से शरीर और मन दोनों स्वस्थ रहते हैं",
      "marathi": "व्यायामामुळे शरीर आणि मन निरोगी राहते",
      "gujarati": "કસરતથી શરીર અને મન બન્ને તંદુરસ્ત રહે છે",
      "tamil": "உடற்பயிற்சி மனதையும் உடலையும் ஆரோக்கியமாக வைத்திருக்கிறது",
      "kannada": "ವ್ಯಾಯಾಮ ದೇಹ ಮತ್ತು ಮನಸ್ಸನ್ನು ಆರೋಗ್ಯಕರವಾಗಿಡುತ್ತದೆ",
      "telugu": "వ్యాయామం మనసును మరియు శరీరాన్ని ఆరోగ్యంగా ఉంచుతుంది",
      "bengali": "অনুশীলন শরীর এবং মন উভয়ই সুস্থ রাখে",
      "malayalam": "ഇടവഴികൾ മനസും ശരീരവും ആരോഗ്യമാകും",
      "punjabi": "ਵਿਆਯਾਮ ਮਨ ਅਤੇ ਸਰੀਰ ਦੋਹਾਂ ਨੂੰ ਸਿਹਤਮੰਦ ਰੱਖਦਾ ਹੈ",
      "odia": "ଅଭ୍ୟାସ ମନ ଓ ଶରୀରକୁ ସ୍ୱାସ୍ଥ୍ୟରେ ରଖେ"
    }
,  

  "drink": {
    hindi: "पीना",
    marathi: "पिणे",
    gujarati: "પીવું",
    tamil: "குடி",
    kannada: "ಕುಡಿ",
    telugu: "తాగు",
    bengali: "পান করা",
    malayalam: "കുടിക്കുക",
    punjabi: "ਪੀਣਾ",
    odia: "ପିଇବା"
  },
  "sleep": {
    hindi: "सोना",
    marathi: "झोप",
    gujarati: "ઊંઘ",
    tamil: "தூங்கு",
    kannada: "ನಿದ್ರೆ",
    telugu: "నిద్ర",
    bengali: "ঘুমানো",
    malayalam: "ഉറങ്ങുക",
    punjabi: "ਸੌਣਾ",
    odia: "ଶୋଇବା"
  },
  "walk": {
    hindi: "चलना",
    marathi: "चालणे",
    gujarati: "ચાલવું",
    tamil: "நடக்க",
    kannada: "ನಡೆ",
    telugu: "నడవడం",
    bengali: "হাঁটা",
    malayalam: "നടക്കുക",
    punjabi: "ਤੁਰਨਾ",
    odia: "ଚାଲିବା"
  },
  "run": {
    hindi: "दौड़ना",
    marathi: "धावणे",
    gujarati: "દોડવું",
    tamil: "ஓடு",
    kannada: "ಓಡು",
    telugu: "పరుగు",
    bengali: "দৌড়ানো",
    malayalam: "ഓടുക",
    punjabi: "ਦੌੜਨਾ",
    odia: "ଦୌଡିବା"
  },
  // Common nouns
  "water": {
    hindi: "पानी",
    marathi: "पाणी",
    gujarati: "પાણી",
    tamil: "தண்ணீர்",
    kannada: "ನೀರು",
    telugu: "నీరు",
    bengali: "জল",
    malayalam: "വെള്ളം",
    punjabi: "ਪਾਣੀ",
    odia: "ପାଣି"
  },
  "food": {
    hindi: "खाना",
    marathi: "अन्न",
    gujarati: "ખોરાક",
    tamil: "உணவு",
    kannada: "ಆಹಾರ",
    telugu: "ఆహారం",
    bengali: "খাবার",
    malayalam: "ഭക്ഷണം",
    punjabi: "ਖਾਣਾ",
    odia: "ଖାଦ୍ୟ"
  },
  "house": {
    hindi: "घर",
    marathi: "घर",
    gujarati: "ઘર",
    tamil: "வீடு",
    kannada: "ಮನೆ",
    telugu: "ఇల్లు",
    bengali: "বাড়ি",
    malayalam: "വീട്",
    punjabi: "ਘਰ",
    odia: "ଘର"
  },
  "book": {
    hindi: "किताब",
    marathi: "पुस्तक",
    gujarati: "પુસ્તક",
    tamil: "புத்தகம்",
    kannada: "ಪುಸ್ತಕ",
    telugu: "పుస్తకం",
    bengali: "বই",
    malayalam: "പുസ്തകം",
    punjabi: "ਕਿਤਾਬ",
    odia: "ବହି"
  },
  // Common adjectives
  "good": {
    hindi: "अच्छा",
    marathi: "चांगला",
    gujarati: "સારું",
    tamil: "நல்ல",
    kannada: "ಒಳ್ಳೆಯ",
    telugu: "మంచి",
    bengali: "ভালো",
    malayalam: "നല്ല",
    punjabi: "ਚੰਗਾ",
    odia: "ଭଲ"
  },
  "bad": {
    hindi: "बुरा",
    marathi: "वाईट",
    gujarati: "ખરાબ",
    tamil: "கெட்ட",
    kannada: "ಕೆಟ್ಟ",
    telugu: "చెడ్డ",
    bengali: "খারাপ",
    malayalam: "മോശം",
    punjabi: "ਮਾੜਾ",
    odia: "ଖରାପ"
  },
  "big": {
    hindi: "बड़ा",
    marathi: "मोठा",
    gujarati: "મોટું",
    tamil: "பெரிய",
    kannada: "ದೊಡ್ಡ",
    telugu: "పెద్ద",
    bengali: "বড়",
    malayalam: "വലിയ",
    punjabi: "ਵੱਡਾ",
    odia: "ବଡ"
  },
  "small": {
    hindi: "छोटा",
    marathi: "लहान",
    gujarati: "નાનું",
    tamil: "சிறிய",
    kannada: "ಚಿಕ್ಕ",
    telugu: "చిన్న",
    bengali: "ছোট",
    malayalam: "ചെറിയ",
    punjabi: "ਛੋਟਾ",
    odia: "ଛୋଟ"
  },
  // Common phrases
  "hello": {
    hindi: "नमस्ते",
    marathi: "नमस्कार",
    gujarati: "નમસ્તે",
    tamil: "வணக்கம்",
    kannada: "ನಮಸ್ಕಾರ",
    telugu: "నమస్కారం",
    bengali: "নমস্কার",
    malayalam: "നമസ്കാരം",
    punjabi: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
    odia: "ନମସ୍କାର"
  },
  "thank you": {
    hindi: "धन्यवाद",
    marathi: "धन्यवाद",
    gujarati: "આભાર",
    tamil: "நன்றி",
    kannada: "ಧನ್ಯವಾದ",
    telugu: "ధన్యవాదాలు",
    bengali: "ধন্যবাদ",
    malayalam: "നന്ദി",
    punjabi: "ਧੰਨਵਾਦ",
    odia: "ଧନ୍ୟବାଦ"
  },
  "please": {
    hindi: "कृपया",
    marathi: "कृपया",
    gujarati: "કૃપા કરી",
    tamil: "தயவு செய்து",
    kannada: "ದಯವಿಟ್ಟು",
    telugu: "దయచేసి",
    bengali: "দয়া করে",
    malayalam: "ദയവായി",
    punjabi: "ਕਿਰਪਾ ਕਰਕੇ",
    odia: "ଦୟାକରି"
  },
  // Numbers
  "one": {
    hindi: "एक",
    marathi: "एक",
    gujarati: "એક",
    tamil: "ஒன்று",
    kannada: "ಒಂದು",
    telugu: "ఒకటి",
    bengali: "এক",
    malayalam: "ഒന്ന്",
    punjabi: "ਇੱਕ",
    odia: "ଏକ"
  },
  "two": {
    hindi: "दो",
    marathi: "दोन",
    gujarati: "બે",
    tamil: "இரண்டு",
    kannada: "ಎರಡು",
    telugu: "రెండు",
    bengali: "দুই",
    malayalam: "രണ്ട്",
    punjabi: "ਦੋ",
    odia: "ଦୁଇ"
  },
  "three": {
    hindi: "तीन",
    marathi: "तीन",
    gujarati: "ત્રણ",
    tamil: "மூன்று",
    kannada: "ಮೂರು",
    telugu: "మూడు",
    bengali: "তিন",
    malayalam: "മൂന്ന്",
    punjabi: "ਤਿੰਨ",
    odia: "ତିନି"
  }
};

export async function POST(request: Request) {
  try {
    const { word } = await request.json();
    const normalizedWord = word.toLowerCase().trim();

    // Check if the word exists in our dataset
    if (translationDataset[normalizedWord as keyof typeof translationDataset]) {
      return NextResponse.json({
        success: true,
        translations: translationDataset[normalizedWord as keyof typeof translationDataset]
      });
    }

    // If word is not found, return an appropriate message
    return NextResponse.json({
      success: false,
      error: "Word not found in database",
      message: "This word is not yet available in our database. Please try another word.",
      translations: Object.fromEntries(
        Object.keys(translationDataset.hello).map(lang => [lang, "Not available"])
      )
    }, { status: 404 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process translation' },
      { status: 500 }
    );
  }
}