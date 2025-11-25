import React, { useState, useEffect } from 'react';
import { ChefHat, Flame, Clock, CheckCircle, ArrowRight, ArrowLeft, Beef, Utensils, Sparkles, Play, Pause, RotateCcw, Home, Grid, Soup, Leaf, Droplet, Layers } from 'lucide-react';

// --- 数据配置 (内容不变) ---
const RECIPES = [
  {
    id: 'black-pepper-beef',
    title: "洋葱黑椒牛肉",
    subtitle: "Frank's Home Kitchen",
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
        icon: <Beef className="w-7 h-7 text-stone-600" />,
        tips: "一定要最后封油，这样下锅容易滑散，口感也嫩。"
      },
      {
        title: "备料调酱 (防手忙脚乱)",
        desc: "洋葱切粗丝。取碗将黑胡椒粉、蚝油、生抽、白糖、清水、淀粉混合均匀。提前调好酱汁是成功的捷径。",
        timer: 0,
        icon: <Utensils className="w-7 h-7 text-stone-600" />,
        tips: "黑胡椒强烈建议用现磨颗粒，风味远比粉末浓郁。"
      },
      {
        title: "滑炒牛肉 (快炒快出)",
        desc: "油比平时多一点，烧至五成热（筷子周围细小气泡）。下牛肉快速滑散，变色约8成熟立即盛出沥油。",
        timer: 60, // Fast stir fry
        icon: <Flame className="w-7 h-7 text-amber-500" />,
        tips: "千万别久炒！变色就捞，余温会让它继续熟。"
      },
      {
        title: "爆香合炒 (焦糖香气)",
        desc: "底油爆香蒜片，下洋葱中大火炒至微透明、边缘焦黄（此时最甜）。倒入牛肉快速翻炒均匀。",
        timer: 90,
        icon: <Sparkles className="w-7 h-7 text-amber-400" />,
        tips: "洋葱炒出焦糖色才好吃，不要炒得太生或太烂。"
      },
      {
        title: "淋汁收尾 (大火收汁)",
        desc: "酱汁再次搅拌（防沉淀），沿锅边淋入。开大火快速翻炒，让酱汁裹满每一片肉和洋葱，浓稠油亮即出锅。",
        timer: 30,
        icon: <CheckCircle className="w-7 h-7 text-green-600/70" />,
        tips: "动作要快，姿势要帅，酱汁裹匀马上关火。"
      }
    ]
  },
  {
    id: 'pork-cabbage-soup-cake',
    title: "肉丝白菜汤年糕",
    subtitle: "Frank's Winter Comfort",
    difficulty: "简单",
    time: "20 分钟",
    calories: "400 kcal",
    description: "肉丝嫩滑，汤底鲜香，年糕软糯。一道温暖人心的家常汤年糕，白胡椒粉是点睛之笔。",
    ingredients: [
      { name: "年糕片", amount: "300g", note: "宁波水磨年糕最佳" },
      { name: "猪里脊", amount: "150g", note: "切细丝" },
      { name: "大白菜", amount: "4-5片", note: "帮叶分离" },
      { name: "姜片", amount: "2-3片", note: "爆锅用" }
    ],
    marinade: [
      { name: "料酒", amount: "1汤匙" },
      { name: "生抽", amount: "1汤匙" },
      { name: "淀粉", amount: "1茶匙" },
      { name: "食用油", amount: "少许", note: "封油防粘" }
    ],
    sauce: [
      { name: "高汤/浓汤宝", amount: "适量", note: "清水亦可，高汤更鲜" },
      { name: "盐", amount: "适量" },
      { name: "白胡椒粉", amount: "少许", note: "灵魂提鲜" },
      { name: "香油", amount: "几滴", note: "出锅前加" }
    ],
    steps: [
      {
        title: "备料腌肉 (基础)",
        desc: "里脊切丝加腌料抓匀腌制15分钟。白菜切片，叶撕小块。年糕若硬先温水泡一下。",
        timer: 900, // 15 mins
        icon: <Utensils className="w-7 h-7 text-stone-600" />,
        tips: "肉丝一定要封油，下锅才不会粘连；年糕泡一下更容易煮透。"
      },
      {
        title: "滑炒肉丝 (定型)",
        desc: "油温五成热爆香姜片，下肉丝快速滑炒至变色（8成熟）立即盛出备用。",
        timer: 60,
        icon: <Flame className="w-7 h-7 text-amber-500" />,
        tips: "肉丝不要炒太久，变色就盛出来，保持嫩度。"
      },
      {
        title: "炒帮煮汤 (鲜底)",
        desc: "底油炒软白菜帮，激发甜味。倒入足量开水或高汤煮沸。",
        timer: 120,
        icon: <Soup className="w-7 h-7 text-stone-600" />,
        tips: "先炒白菜帮可以激发蔬菜的甜味，汤底更鲜。"
      },
      {
        title: "煮年糕 (软糯)",
        desc: "汤开后下年糕片，保持中大火煮3-5分钟，直到年糕变软。",
        timer: 240, // 4 mins
        icon: <Clock className="w-7 h-7 text-stone-500" />,
        tips: "煮年糕时不要频繁搅动，防止煮烂，用勺背轻轻推两下就行。"
      },
      {
        title: "合体调味 (出锅)",
        desc: "下白菜叶和肉丝，加盐和白胡椒粉调味。煮至菜叶变软即可出锅，滴入香油。",
        timer: 90,
        icon: <Leaf className="w-7 h-7 text-green-600/70" />,
        tips: "白胡椒粉去腥提鲜，是这道汤的灵魂，千万别省！"
      }
    ]
  },
  {
    id: 'kimchi-pork-belly',
    title: "泡菜炒五花肉",
    subtitle: "Korean Classic Twist",
    difficulty: "中等",
    time: "25 分钟",
    calories: "500 kcal",
    description: "酸辣开胃，五花肉焦香不腻，泡菜爽脆。这道精简版去除了葱洋葱，纯粹享受肉与泡菜的灵魂碰撞。",
    ingredients: [
      { name: "五花肉", amount: "400g", note: "冷冻后切薄片最佳" },
      { name: "韩国泡菜", amount: "200g", note: "老泡菜味更浓，切小块" },
      { name: "大蒜", amount: "4瓣", note: "切末，增香担当" }
    ],
    marinade: [
      { name: "泡菜汁", amount: "3大勺", note: "这道菜的灵魂" },
      { name: "韩式辣酱", amount: "1大勺" },
      { name: "生抽", amount: "1大勺" },
      { name: "料酒", amount: "1大勺" },
      { name: "白糖/蜂蜜", amount: "1小勺", note: "平衡酸味" }
    ],
    sauce: [
      { name: "香油", amount: "1小勺", note: "出锅淋入" },
      { name: "熟白芝麻", amount: "适量", note: "点缀增香" }
    ],
    steps: [
      {
        title: "备料处理 (关键)",
        desc: "五花肉切薄片（冷冻一下更好切）。泡菜切适口大小。记得留出3大勺泡菜汁，这可是灵魂！",
        timer: 0,
        icon: <Layers className="w-7 h-7 text-stone-600" />,
        tips: "一定要用发酵比较久的酸泡菜，味道才够劲。"
      },
      {
        title: "干煸五花肉 (逼油)",
        desc: "平底锅不放油，中小火直接下五花肉。慢慢煎至两面金黄焦香，逼出多余油脂（倒掉一部分油）。",
        timer: 300, // 5 mins slow fry
        icon: <Flame className="w-7 h-7 text-amber-500" />,
        tips: "必须要把肉煸到焦黄，这样吃起来才酥脆不腻。"
      },
      {
        title: "爆香融合 (增味)",
        desc: "利用底油爆香蒜末，放入泡菜转中大火快速翻炒，让泡菜充分吸收猪油的香气。",
        timer: 120,
        icon: <Sparkles className="w-7 h-7 text-amber-400" />,
        tips: "猪油炒泡菜是绝配，香味瞬间提升一个档次。"
      },
      {
        title: "调味焖煮 (入味)",
        desc: "淋入料酒、生抽、辣酱、糖和关键的泡菜汁。盖盖小火焖煮2-3分钟，让肉吸满汤汁。",
        timer: 180, // 3 mins simmer
        icon: <Clock className="w-7 h-7 text-stone-500" />,
        tips: "焖煮能让味道融合，肉质也更入味。"
      },
      {
        title: "收汁出锅 (点睛)",
        desc: "开盖大火收汁，关火后淋入香油，撒上白芝麻翻炒均匀装盘。",
        timer: 30,
        icon: <CheckCircle className="w-7 h-7 text-green-600/70" />,
        tips: "香油一定要关火后再放，保留最大的香气。"
      }
    ]
  }
];

// --- 组件部分 (样式全面Ins风化) ---

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
    <div className="flex items-center space-x-4 bg-stone-100/80 p-3 rounded-xl border border-stone-200 mt-5 shadow-sm">
      <div className="text-3xl font-mono font-bold text-stone-700 w-24 text-center tracking-wider">
        {formatTime(seconds)}
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`p-2 rounded-full transition-all shadow-sm ${isActive ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'}`}
        >
          {isActive ? <Pause size={20} strokeWidth={1.5} /> : <Play size={20} strokeWidth={1.5} />}
        </button>
        <button 
          onClick={() => { setIsActive(false); setSeconds(initialSeconds); }}
          className="p-2 bg-stone-100 text-stone-500 rounded-full hover:bg-stone-200 transition-colors shadow-sm border border-stone-200"
        >
          <RotateCcw size={20} strokeWidth={1.5} />
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
    <div className="mb-8">
      <h3 className="text-lg font-bold text-stone-700 mb-4 flex items-center">
        <span className="w-1.5 h-5 bg-amber-400/70 mr-2 rounded-full"></span>
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item, idx) => (
          <div 
            key={idx}
            onClick={() => toggleItem(idx)}
            className={`
              cursor-pointer p-3 rounded-xl border transition-all duration-300 flex justify-between items-center group shadow-sm
              ${checkedItems[idx] 
                ? 'bg-stone-100/80 border-stone-200 opacity-70' 
                : 'bg-white border-stone-100 hover:border-amber-200 hover:shadow-md'}
            `}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 transition-colors ${checkedItems[idx] ? 'bg-green-500/20 border-green-500/30' : 'border-stone-300 group-hover:border-amber-300'}`}>
                 {checkedItems[idx] && <CheckCircle className="w-3.5 h-3.5 text-green-600" />}
              </div>
              <div>
                <span className={`font-medium ${checkedItems[idx] ? 'line-through text-stone-400' : 'text-stone-700'}`}>
                  {item.name}
                </span>
                {item.note && (
                  <p className="text-xs text-stone-400 mt-0.5 font-light">{item.note}</p>
                )}
              </div>
            </div>
            <span className={`text-sm font-medium ${checkedItems[idx] ? 'text-stone-400' : 'text-amber-600/80'}`}>
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
      <div className="flex justify-between items-center mb-6 px-2">
        <span className="text-xs font-bold tracking-widest text-stone-400 uppercase">
          Step {stepIndex + 1} / {totalSteps}
        </span>
        <div className="flex space-x-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i <= stepIndex ? 'w-6 bg-amber-400/80' : 'w-2 bg-stone-200'}`}
            ></div>
          ))}
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-6 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        {/* Subtle warm light blob instead of harsh glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl pointer-events-none mix-blend-multiply"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-8">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 shadow-sm mr-5 text-stone-600">
              {step.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-1">{step.title}</h2>
              <p className="text-amber-600/70 font-medium text-sm">关键点 / Keypoint</p>
            </div>
          </div>

          <p className="text-lg text-stone-600 leading-relaxed mb-8 font-light">
            {step.desc}
          </p>

          {step.tips && (
            <div className="bg-stone-50/80 border border-stone-100 p-5 rounded-2xl mb-6 flex items-start shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-stone-500 text-sm italic">{step.tips}</p>
            </div>
          )}

          {step.timer > 0 && (
             <CountdownTimer key={stepIndex} initialSeconds={step.timer} />
          )}
        </div>
      </div>

      <div className="flex justify-between mt-10 px-2">
        <button 
          onClick={prevStep}
          disabled={stepIndex === 0}
          className={`flex items-center px-6 py-3 rounded-full font-bold transition-all text-sm ${
            stepIndex === 0 
              ? 'opacity-0 pointer-events-none' 
              : 'text-stone-500 hover:bg-stone-100 hover:text-stone-700'
          }`}
        >
          <ArrowLeft className="mr-2 w-4 h-4" strokeWidth={2} /> 上一步
        </button>

        <button 
          onClick={nextStep}
          className="group flex items-center px-8 py-3 rounded-full bg-stone-800 text-stone-50 font-bold shadow-md hover:shadow-lg hover:bg-stone-700 transition-all text-sm"
        >
          {stepIndex === totalSteps - 1 ? '完成烹饪' : '下一步'} 
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

// --- 首页菜谱卡片组件 (Ins风) ---
const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white border border-stone-100 rounded-[2rem] p-6 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 relative overflow-hidden"
    >
      {/* Subtle warm gradient instead of harsh blob */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-amber-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-5">
          <div className="p-3 bg-stone-50 rounded-2xl shadow-sm border border-stone-100/50 group-hover:border-amber-100/50 transition-colors">
            <ChefHat className="text-stone-600 w-6 h-6" strokeWidth={1.5} />
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-stone-100 rounded-full text-stone-500 border border-stone-200/50">
            {recipe.difficulty}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-stone-800 mb-3 group-hover:text-amber-700 transition-colors">
          {recipe.title}
        </h3>
        <p className="text-stone-500 text-sm line-clamp-2 mb-6 h-10 font-light leading-relaxed">
          {recipe.description}
        </p>

        <div className="flex items-center space-x-5 text-xs text-stone-400 font-medium">
          <div className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1.5 text-stone-400" strokeWidth={2} /> {recipe.time}
          </div>
          <div className="flex items-center">
            <Flame className="w-3.5 h-3.5 mr-1.5 text-stone-400" strokeWidth={2} /> {recipe.calories}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null); 
  const [view, setView] = useState('home'); 
  const [currentStep, setCurrentStep] = useState(0);

  // 处理返回首页
  const goBackToMenu = () => {
    setSelectedRecipe(null);
    setView('home');
    setCurrentStep(0);
  };

  return (
    // 主题色切换：深色背景 -> 米白/奶油色背景，文字颜色变深
    <div className="min-h-screen bg-stone-50 text-stone-700 font-sans selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden relative">
      
      {/* Background Ambience - 韩系柔光氛围 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-100/40 rounded-full blur-[120px] mix-blend-multiply opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-50/50 rounded-full blur-[150px] mix-blend-multiply opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* Navigation / Header */}
        <header className="flex justify-between items-center mb-16 animate-fade-in-down px-2">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={goBackToMenu}
          >
            <div className="bg-white border border-stone-100 p-2.5 rounded-xl shadow-sm transform group-hover:rotate-6 transition-all duration-300">
              <ChefHat size={22} className="text-stone-600" strokeWidth={1.5} />
            </div>
            <span className="font-bold text-lg tracking-tight text-stone-700 group-hover:text-amber-700 transition-colors">
              Frank<span className="text-amber-500 font-light">'s</span> 小食堂
            </span>
          </div>
          
          {selectedRecipe && (
             <button 
               onClick={goBackToMenu}
               className="flex items-center text-sm font-bold text-stone-500 hover:text-stone-800 transition-colors bg-white/70 px-5 py-2.5 rounded-full border border-stone-200/80 hover:bg-white hover:shadow-sm backdrop-blur-sm"
             >
               <Grid className="w-4 h-4 mr-2" strokeWidth={2} /> 
               菜单
             </button>
          )}
        </header>

        {/* --- 场景 1: 首页菜谱列表 --- */}
        {!selectedRecipe && (
          <div className="animate-fade-in-up px-2">
             <div className="text-center mb-20">
                <div className="inline-block mb-4">
                  <Sparkles className="w-6 h-6 text-amber-400/80 mx-auto" strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-stone-800 mb-6 tracking-tight">
                  今天想吃点<span className="text-amber-600/80 relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-3 after:bg-amber-200/30 after:-z-10">什么？</span>
                </h1>
                <p className="text-stone-500 text-lg font-light max-w-xl mx-auto leading-relaxed">
                  Frank 的私房慢调味，记录生活中的温暖食刻。
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {RECIPES.map(recipe => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onClick={() => setSelectedRecipe(recipe)} 
                  />
                ))}
                
                {/* 占位符卡片 */}
                <div className="border-2 border-dashed border-stone-200 bg-stone-50/50 rounded-[2rem] p-6 flex flex-col justify-center items-center text-stone-400 min-h-[220px] hover:bg-stone-50 transition-colors">
                   <Leaf className="mb-4 w-8 h-8 opacity-30" strokeWidth={1} />
                   <p className="font-medium text-sm tracking-widest uppercase">More to come...</p>
                </div>
             </div>
          </div>
        )}

        {/* --- 场景 2: 具体的菜谱详情 --- */}
        {selectedRecipe && (
          <>
            {/* --- VIEW: HOME (Recipe Intro) --- */}
            {view === 'home' && (
              <div className="flex-1 flex flex-col justify-center items-center text-center animate-fade-in-up px-4">
                <div className="inline-block px-5 py-2 rounded-full bg-amber-50 text-amber-700/80 text-sm font-bold mb-8 tracking-wider uppercase border border-amber-100/50 shadow-sm">
                  {selectedRecipe.subtitle}
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-stone-800 mb-8 tracking-tight leading-tight relative">
                  {selectedRecipe.title}
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-amber-200/60 rounded-full"></span>
                </h1>
                
                <p className="text-xl text-stone-500 max-w-lg mx-auto mb-12 leading-relaxed font-light">
                  {selectedRecipe.description}
                </p>

                <div className="flex flex-wrap justify-center gap-8 mb-16 pb-8 border-b border-stone-100">
                  <div className="flex flex-col items-center text-stone-500">
                    <Clock className="w-6 h-6 mb-2 text-amber-500/70" strokeWidth={1.5} />
                    <span className="text-sm font-medium">{selectedRecipe.time}</span>
                  </div>
                  <div className="flex flex-col items-center text-stone-500">
                    <Flame className="w-6 h-6 mb-2 text-amber-500/70" strokeWidth={1.5} />
                    <span className="text-sm font-medium">{selectedRecipe.calories}</span>
                  </div>
                  <div className="flex flex-col items-center text-stone-500">
                    <Sparkles className="w-6 h-6 mb-2 text-amber-500/70" strokeWidth={1.5} />
                    <span className="text-sm font-medium">{selectedRecipe.difficulty}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setView('ingredients')}
                  className="group relative px-12 py-5 bg-stone-800 text-stone-50 font-bold text-lg rounded-full overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    准备食材 <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform w-5 h-5" />
                  </span>
                </button>
              </div>
            )}

            {/* --- VIEW: INGREDIENTS --- */}
            {view === 'ingredients' && (
              <div className="animate-fade-in-up max-w-3xl mx-auto w-full px-2">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-stone-800 mb-3">准备清单</h2>
                  <p className="text-stone-500 font-light flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600/50" /> 点击勾选已准备好的食材
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-10 relative">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-100/0 via-amber-200/40 to-amber-100/0"></div>
                  <IngredientsList title="主料" items={selectedRecipe.ingredients} />
                  <IngredientsList title="调味 / 腌料" items={selectedRecipe.marinade} />
                  <IngredientsList title="其他 / 点缀" items={selectedRecipe.sauce} />
                </div>

                <div className="flex justify-center">
                  <button 
                    onClick={() => setView('cooking')}
                    className="w-full md:w-auto px-12 py-4 bg-stone-800 hover:bg-stone-700 text-stone-50 font-bold rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center"
                  >
                    <Flame className="mr-3 w-5 h-5 text-amber-200" /> 开始烹饪
                  </button>
                </div>
              </div>
            )}

            {/* --- VIEW: COOKING --- */}
            {view === 'cooking' && (
              <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center px-2">
                <StepCard 
                  step={selectedRecipe.steps[currentStep]} 
                  stepIndex={currentStep}
                  totalSteps={selectedRecipe.steps.length}
                  nextStep={() => {
                    if (currentStep < selectedRecipe.steps.length - 1) {
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
              <div className="flex-1 flex flex-col justify-center items-center text-center animate-fade-in-up px-4">
                <div className="relative mb-10">
                  <div className="absolute inset-0 bg-amber-100 rounded-full blur-3xl opacity-60 animate-pulse scale-150"></div>
                  <div className="relative bg-white p-10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-stone-50">
                    <Utensils size={64} className="text-stone-700" strokeWidth={1} />
                  </div>
                </div>
                
                <h2 className="text-4xl font-black text-stone-800 mb-6">完成啦！</h2>
                <p className="text-xl text-stone-500 max-w-md mx-auto mb-12 font-light leading-relaxed">
                  快盛上一碗热气腾腾的<span className="font-bold text-amber-700 mx-2">{selectedRecipe.title}</span>，<br/>享受这治愈的食刻吧！
                </p>

                <div className="flex gap-4">
                  <button 
                    onClick={goBackToMenu}
                    className="px-10 py-4 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full font-bold transition-colors shadow-sm"
                  >
                    返回菜单
                  </button>
                </div>
              </div>
            )}
          </>
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
          animation: fade-in-up 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}