import React, { useState, useEffect } from 'react';
import { ChefHat, Flame, Clock, CheckCircle, ArrowRight, ArrowLeft, Beef, Utensils, Sparkles, Play, Pause, RotateCcw } from 'lucide-react';

// --- 数据配置 (Frank 的家庭版攻略) ---
const RECIPE = {
  title: "洋葱黑椒牛肉",
  subtitle: "Frank's Kitchen Special",
  difficulty: "容易",
  time: "30 分钟",
  calories: "350 kcal",
  description: "肉质滑嫩，黑椒味浓郁，洋葱清甜。这道家庭版做法绝对是下饭神器，每一口都是满满的幸福感。",
  ingredients: [
    { name: "牛肉", amount: "300g", note: "牛里脊/牛霖/上脑，逆纹切片" },
    { name: "洋葱", amount: "1个", note: "中等大小，切粗丝或块" },
    { name: "大蒜", amount: "3-4瓣", note: "切片" },
    { name: "食用油", amount: "适量", note: "炒菜用" }
  ],
  marinade: [
    { name: "生抽", amount: "1汤匙" },
    { name: "老抽", amount: "半茶匙", note: "上色关键" },
    { name: "料酒", amount: "1汤匙" },
    { name: "蚝油", amount: "1汤匙" },
    { name: "清水", amount: "2汤匙", note: "让肉喝饱水" },
    { name: "玉米淀粉", amount: "1汤匙", note: "锁水" },
    { name: "食用油", amount: "1汤匙", note: "最后封油" }
  ],
  sauce: [
    { name: "黑胡椒粉", amount: "1-2汤匙", note: "现磨最佳，根据口味调整" },
    { name: "蚝油", amount: "1汤匙" },
    { name: "生抽", amount: "1汤匙" },
    { name: "白糖", amount: "1茶匙", note: "提鲜平衡" },
    { name: "清水/高汤", amount: "5汤匙" },
    { name: "玉米淀粉", amount: "1茶匙" }
  ],
  steps: [
    {
      title: "处理牛肉 (嫩滑关键)",
      desc: "逆纹切片是基石！加生抽、老抽、料酒、蚝油抓匀发粘。分次加入2汤匙水抓捏让肉'喝饱水'。加淀粉裹匀，最后淋油封住水分。",
      timer: 900, // 15 mins
      icon: <Beef className="w-8 h-8 text-rose-400" />,
      tips: "一定要最后封油，这样下锅容易滑散，口感也嫩。"
    },
    {
      title: "备料调酱 (防手忙脚乱)",
      desc: "洋葱切粗丝。取碗将黑胡椒粉、蚝油、生抽、白糖、清水、淀粉混合均匀。提前调好酱汁是成功的捷径。",
      timer: 0,
      icon: <Utensils className="w-8 h-8 text-yellow-400" />,
      tips: "黑胡椒强烈建议用现磨颗粒，风味远比粉末浓郁。"
    },
    {
      title: "滑炒牛肉 (快炒快出)",
      desc: "油比平时多一点，烧至五成热（筷子周围细小气泡）。下牛肉快速滑散，变色约8成熟立即盛出沥油。",
      timer: 60, // Fast stir fry
      icon: <Flame className="w-8 h-8 text-orange-500" />,
      tips: "千万别久炒！变色就捞，余温会让它继续熟。"
    },
    {
      title: "爆香合炒 (焦糖香气)",
      desc: "底油爆香蒜片，下洋葱中大火炒至微透明、边缘焦黄（此时最甜）。倒入牛肉快速翻炒均匀。",
      timer: 90,
      icon: <Sparkles className="w-8 h-8 text-purple-400" />,
      tips: "洋葱炒出焦糖色才好吃，不要炒得太生或太烂。"
    },
    {
      title: "淋汁收尾 (大火收汁)",
      desc: "酱汁再次搅拌（防沉淀），沿锅边淋入。开大火快速翻炒，让酱汁裹满每一片肉和洋葱，浓稠油亮即出锅。",
      timer: 30,
      icon: <CheckCircle className="w-8 h-8 text-green-400" />,
      tips: "动作要快，姿势要帅，酱汁裹匀马上关火。"
    }
  ]
};

// --- 组件部分 ---

const CountdownTimer = ({ initialSeconds, onComplete }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(s => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
      if (onComplete) onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, onComplete]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex items-center space-x-4 bg-slate-800/50 p-3 rounded-xl border border-slate-700 mt-4">
      <div className="text-3xl font-mono font-bold text-orange-400 w-24 text-center">
        {formatTime(seconds)}
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`p-2 rounded-full transition-colors ${isActive ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isActive ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button 
          onClick={() => { setIsActive(false); setSeconds(initialSeconds); }}
          className="p-2 bg-slate-600 rounded-full hover:bg-slate-500 transition-colors"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};

const IngredientsList = ({ items, title }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (idx) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-slate-300 mb-3 flex items-center">
        <span className="w-2 h-6 bg-orange-500 mr-2 rounded-full"></span>
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item, idx) => (
          <div 
            key={idx}
            onClick={() => toggleItem(idx)}
            className={`
              cursor-pointer p-3 rounded-lg border transition-all duration-300 flex justify-between items-center group
              ${checkedItems[idx] 
                ? 'bg-green-900/20 border-green-800/50 opacity-60' 
                : 'bg-slate-800/40 border-slate-700 hover:bg-slate-700/50 hover:border-orange-500/50'}
            `}
          >
            <div>
              <span className={`font-medium ${checkedItems[idx] ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                {item.name}
              </span>
              {item.note && (
                <p className="text-xs text-slate-400 mt-0.5">{item.note}</p>
              )}
            </div>
            <span className={`text-sm font-bold ${checkedItems[idx] ? 'text-slate-600' : 'text-orange-400'}`}>
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StepCard = ({ step, stepIndex, totalSteps, nextStep, prevStep }) => {
  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">
          Step {stepIndex + 1} / {totalSteps}
        </span>
        <div className="flex space-x-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${i <= stepIndex ? 'bg-orange-500' : 'bg-slate-700'}`}
            ></div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700 p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Background Decorative Blob */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 shadow-lg mr-5">
              {step.icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">{step.title}</h2>
              <p className="text-orange-400 font-medium">关键点</p>
            </div>
          </div>

          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            {step.desc}
          </p>

          {step.tips && (
            <div className="bg-yellow-900/20 border border-yellow-700/30 p-4 rounded-xl mb-6 flex items-start">
              <Sparkles className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-yellow-200/80 text-sm italic">{step.tips}</p>
            </div>
          )}

          {step.timer > 0 && (
             <CountdownTimer initialSeconds={step.timer} />
          )}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button 
          onClick={prevStep}
          disabled={stepIndex === 0}
          className={`flex items-center px-6 py-3 rounded-full font-bold transition-all ${
            stepIndex === 0 
              ? 'opacity-0 pointer-events-none' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <ArrowLeft className="mr-2 w-5 h-5" /> 上一步
        </button>

        <button 
          onClick={nextStep}
          className="group flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold shadow-lg shadow-orange-900/50 hover:shadow-orange-600/50 hover:scale-105 transition-all"
        >
          {stepIndex === totalSteps - 1 ? '完成烹饪!' : '下一步'} 
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('home'); // home, ingredients, cooking, done
  const [currentStep, setCurrentStep] = useState(0);

  // Background particle effect
  const bgParticles = Array.from({ length: 20 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: Math.random() * 0.3
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden relative">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(60,20,10,0.5),rgba(15,23,42,1))]"></div>
        {bgParticles.map((style, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full animate-pulse"
            style={{...style, animationDuration: '4s'}}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 min-h-screen flex flex-col">
        
        {/* Navigation / Header */}
        <header className="flex justify-between items-center mb-12 animate-fade-in-down">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => { setView('home'); setCurrentStep(0); }}
          >
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg transform group-hover:rotate-12 transition-transform">
              <ChefHat size={24} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-orange-400 transition-colors">
              Frank<span className="text-orange-500">厨房</span>
            </span>
          </div>
          {view !== 'home' && (
             <button 
               onClick={() => setView('home')}
               className="text-sm font-medium text-slate-500 hover:text-white transition-colors"
             >
               退出烹饪
             </button>
          )}
        </header>

        {/* --- VIEW: HOME --- */}
        {view === 'home' && (
          <div className="flex-1 flex flex-col justify-center items-center text-center animate-fade-in-up">
            <div className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-bold mb-6 tracking-wide uppercase">
              Frank's Kitchen Recipe
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">绝味</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 animate-gradient-x">
                {RECIPE.title}
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed">
              {RECIPE.description}
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center text-slate-300">
                <Clock className="w-5 h-5 mr-2 text-orange-500" />
                <span>{RECIPE.time}</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Flame className="w-5 h-5 mr-2 text-red-500" />
                <span>{RECIPE.calories}</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                <span>{RECIPE.difficulty}</span>
              </div>
            </div>

            <button 
              onClick={() => setView('ingredients')}
              className="group relative px-10 py-5 bg-white text-slate-900 font-black text-xl rounded-full overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <span className="relative z-10 flex items-center">
                开始备菜 <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </button>
          </div>
        )}

        {/* --- VIEW: INGREDIENTS --- */}
        {view === 'ingredients' && (
          <div className="animate-fade-in-up max-w-2xl mx-auto w-full">
            <h2 className="text-3xl font-bold text-white mb-2">准备食材</h2>
            <p className="text-slate-400 mb-8">点击划掉已经准备好的材料</p>

            <div className="bg-slate-900/50 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl mb-8">
              <IngredientsList title="主料与配菜" items={RECIPE.ingredients} />
              <IngredientsList title="牛肉腌料 (给肉喝饱水)" items={RECIPE.marinade} />
              <IngredientsList title="黑椒酱汁 (灵魂)" items={RECIPE.sauce} />
            </div>

            <div className="flex justify-center">
              <button 
                onClick={() => setView('cooking')}
                className="w-full md:w-auto px-12 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-900/50 transition-all transform active:scale-95 flex items-center justify-center"
              >
                <Flame className="mr-2" /> 进入烹饪模式
              </button>
            </div>
          </div>
        )}

        {/* --- VIEW: COOKING --- */}
        {view === 'cooking' && (
          <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
            <StepCard 
              step={RECIPE.steps[currentStep]} 
              stepIndex={currentStep}
              totalSteps={RECIPE.steps.length}
              nextStep={() => {
                if (currentStep < RECIPE.steps.length - 1) {
                  setCurrentStep(c => c + 1);
                } else {
                  setView('done');
                }
              }}
              prevStep={() => setCurrentStep(c => c - 1)}
            />
          </div>
        )}

        {/* --- VIEW: DONE --- */}
        {view === 'done' && (
          <div className="flex-1 flex flex-col justify-center items-center text-center animate-fade-in-up">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
              <div className="relative bg-slate-800 p-8 rounded-full border-4 border-orange-500 shadow-2xl">
                <Utensils size={64} className="text-white" />
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4">大功告成！</h2>
            <p className="text-xl text-slate-300 max-w-md mx-auto mb-10">
              盛上一碗热气腾腾的米饭，尽情享用这道香气扑鼻的洋葱黑椒牛肉吧！
            </p>

            <div className="flex gap-4">
              <button 
                onClick={() => { setView('home'); setCurrentStep(0); }}
                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors"
              >
                返回首页
              </button>
            </div>
          </div>
        )}

      </div>
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 4s linear infinite;
        }
        @keyframes gradient-x {
          to { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}