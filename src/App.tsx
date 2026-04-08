import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Smartphone, 
  Wrench, 
  Battery, 
  Droplets, 
  Cpu, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ChevronRight, 
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { diagnosePhoneProblem } from "./services/geminiService";

const services = [
  {
    id: 1,
    title: "Ekran almashtirish",
    description: "Siniq yoki ishlamaydigan ekranlarni 1 soatda original sifatli ekranlarga almashtiramiz.",
    icon: <Smartphone className="w-8 h-8 text-blue-500" />,
    price: "150,000 so'mdan"
  },
  {
    id: 2,
    title: "Batareya almashtirish",
    description: "Telefoningiz quvvati tez tugayaptimi? Yangi original batareya qo'yib beramiz.",
    icon: <Battery className="w-8 h-8 text-green-500" />,
    price: "100,000 so'mdan"
  },
  {
    id: 3,
    title: "Suv tegishi",
    description: "Suvga tushgan yoki namlik kirgan telefonlarni maxsus uskunalar yordamida qayta tiklaymiz.",
    icon: <Droplets className="w-8 h-8 text-cyan-500" />,
    price: "80,000 so'mdan"
  },
  {
    id: 4,
    title: "Dasturiy ta'minot",
    description: "Qotib qolish, parolni unutish, proshivka qilish va boshqa dasturiy muammolarni tuzatamiz.",
    icon: <Cpu className="w-8 h-8 text-purple-500" />,
    price: "50,000 so'mdan"
  },
  {
    id: 5,
    title: "Kamera va Dinamik",
    description: "Xira rasmga olish yoki past ovoz muammolarini bartaraf etamiz.",
    icon: <Wrench className="w-8 h-8 text-orange-500" />,
    price: "70,000 so'mdan"
  },
  {
    id: 6,
    title: "Zaryadlash porti",
    description: "Telefoningiz zaryad olmayaptimi? Portni tozalaymiz yoki almashtiramiz.",
    icon: <ShieldCheck className="w-8 h-8 text-red-500" />,
    price: "60,000 so'mdan"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [diagnosisText, setDiagnosisText] = useState("");
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({ name: "", phone: "", problem: "" });

  const handleDiagnosis = async () => {
    if (!diagnosisText.trim()) {
      toast.error("Iltimos, muammoni tasvirlang");
      return;
    }
    setIsDiagnosing(true);
    setAiResponse(null);
    try {
      const result = await diagnosePhoneProblem(diagnosisText);
      setAiResponse(result);
      toast.success("Diagnostika tayyor!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Xatolik yuz berdi");
    } finally {
      setIsDiagnosing(false);
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.phone) {
      toast.error("Iltimos, ismingiz va telefon raqamingizni kiriting");
      return;
    }
    toast.success("Arizangiz qabul qilindi! Tez orada siz bilan bog'lanamiz.");
    setBookingData({ name: "", phone: "", problem: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      <Toaster position="top-center" />
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Smartphone className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">SmartFix</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Xizmatlar</a>
              <a href="#diagnosis" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">AI Diagnostika</a>
              <a href="#booking" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Navbatga yozilish</a>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Phone className="w-4 h-4 mr-2" />
                +998 90 123 45 67
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white border-bottom border-slate-200 px-4 py-4 space-y-4"
            >
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-600">Xizmatlar</a>
              <a href="#diagnosis" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-600">AI Diagnostika</a>
              <a href="#booking" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-600">Navbatga yozilish</a>
              <Button className="w-full bg-blue-600">
                <Phone className="w-4 h-4 mr-2" />
                +998 90 123 45 67
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1">
                  Professional Servis Markazi
                </Badge>
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                  Telefoningizni <span className="text-blue-600">yangidek</span> qilamiz!
                </h1>
                <p className="text-lg text-slate-600 mb-8 max-w-lg">
                  SmartFix - barcha turdagi smartfonlarni professional ta'mirlash markazi. 
                  Tezkor, sifatli va kafolatli xizmat ko'rsatamiz.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8" onClick={() => window.location.hash = "#booking"}>
                    Navbatga yozilish
                  </Button>
                  <Button size="lg" variant="outline" className="px-8" onClick={() => window.location.hash = "#services"}>
                    Xizmatlar bilan tanishish
                  </Button>
                </div>
                
                <div className="mt-12 grid grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-slate-900">10k+</span>
                    <span className="text-sm text-slate-500">Mijozlar</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-slate-900">5 yil</span>
                    <span className="text-sm text-slate-500">Tajriba</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-slate-900">1 soat</span>
                    <span className="text-sm text-slate-500">O'rtacha vaqt</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://picsum.photos/seed/phone-repair/800/600" 
                    alt="Phone Repair" 
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Bizning Xizmatlar</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Har qanday murakkablikdagi muammolarni hal qilamiz. 
                Faqat original ehtiyot qismlardan foydalanamiz.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-slate-100 group">
                    <CardHeader>
                      <div className="mb-4 p-3 bg-slate-50 rounded-xl w-fit group-hover:bg-blue-50 transition-colors">
                        {service.icon}
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-slate-500 leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-blue-600">{service.price}</span>
                        <Button variant="ghost" size="sm" className="text-slate-400 group-hover:text-blue-600">
                          Batafsil <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Diagnosis Section */}
        <section id="diagnosis" className="py-24 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-blue-600 p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">AI Diagnostika</h2>
                </div>
                <p className="text-blue-100">
                  Telefoningizdagi muammoni yozing, bizning sun'iy intellekt sizga dastlabki tashxisni qo'yib beradi.
                </p>
              </div>
              
              <div className="p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Muammoni batafsil tasvirlang
                    </label>
                    <Textarea 
                      placeholder="Masalan: Telefonim suvga tushib ketdi va endi ekranida chiziqlar paydo bo'ldi..."
                      className="min-h-[120px] resize-none focus:ring-blue-500"
                      value={diagnosisText}
                      onChange={(e) => setDiagnosisText(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleDiagnosis} 
                    disabled={isDiagnosing}
                    className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
                  >
                    {isDiagnosing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Tahlil qilinmoqda...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Diagnostika qilish
                      </>
                    )}
                  </Button>

                  <AnimatePresence>
                    {aiResponse && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-8 pt-8 border-t border-slate-100"
                      >
                        <div className="flex items-start gap-3 mb-4">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">AI Tashxisi:</h3>
                            <p className="text-sm text-slate-500">Bu ma'lumotlar taxminiy hisoblanadi.</p>
                          </div>
                        </div>
                        <ScrollArea className="h-[300px] w-full rounded-xl border border-slate-100 bg-slate-50 p-6">
                          <div className="prose prose-slate prose-sm max-w-none">
                            <ReactMarkdown>{aiResponse}</ReactMarkdown>
                          </div>
                        </ScrollArea>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section id="booking" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Navbatga yozilish</h2>
                <p className="text-slate-600 mb-8">
                  Vaqtingizni tejang! Oldindan navbatga yoziling va biz sizni kutib olamiz. 
                  Arizangizni qoldiring, ustalarimiz 15 daqiqa ichida siz bilan bog'lanishadi.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Ish vaqti</h4>
                      <p className="text-slate-500">Har kuni: 09:00 - 20:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Manzil</h4>
                      <p className="text-slate-500">Toshkent sh., Chilonzor tumani, 1-mavze</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-full">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Telegram</h4>
                      <p className="text-slate-500">@smartfix_uz</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-8 shadow-2xl border-slate-100">
                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Ismingiz</label>
                    <Input 
                      placeholder="Ismingizni kiriting" 
                      value={bookingData.name}
                      onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Telefon raqamingiz</label>
                    <Input 
                      placeholder="+998 90 123 45 67" 
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Muammo (ixtiyoriy)</label>
                    <Textarea 
                      placeholder="Qanday yordam kerak?" 
                      className="min-h-[100px]"
                      value={bookingData.problem}
                      onChange={(e) => setBookingData({...bookingData, problem: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">
                    Yuborish
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Smartphone className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">SmartFix</span>
              </div>
              <p className="max-w-sm mb-6">
                Professional telefon ta'mirlash markazi. Biz sizning qurilmangizga ikkinchi hayot beramiz. 
                Sifat va ishonch - bizning ustuvor vazifamiz.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Tezkor havolalar</h4>
              <ul className="space-y-4">
                <li><button onClick={() => window.location.hash = "#services"} className="hover:text-blue-400 transition-colors cursor-pointer">Xizmatlar</button></li>
                <li><button onClick={() => window.location.hash = "#diagnosis"} className="hover:text-blue-400 transition-colors cursor-pointer">AI Diagnostika</button></li>
                <li><button onClick={() => window.location.hash = "#booking"} className="hover:text-blue-400 transition-colors cursor-pointer">Navbatga yozilish</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Bog'lanish</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +998 90 123 45 67
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Toshkent, Chilonzor
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-slate-800 mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2026 SmartFix Servis Markazi. Barcha huquqlar himoyalangan.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a>
              <a href="#" className="hover:text-white transition-colors">Foydalanish shartlari</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
