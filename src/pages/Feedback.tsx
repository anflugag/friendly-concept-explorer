
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import BottomNav from '../components/navigation/BottomNav';

const Feedback = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Здесь будет логика отправки формы
    toast({
      title: "Спасибо за обратную связь!",
      description: "Ваше сообщение успешно отправлено",
    });

    // Очищаем форму
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] text-foreground pb-16">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-[#151120] mb-2">
            {t('sections.feedback')}
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Поделитесь своими мыслями и предложениями
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Ваше имя
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите ваше имя"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите ваш email"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">
              Сообщение
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Напишите ваше сообщение"
              className="w-full min-h-[150px]"
              required
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Отправить
          </Button>
        </form>
      </main>
      <BottomNav />
    </div>
  );
};

export default Feedback;
