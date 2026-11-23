import React, { useState } from 'react';
import {
  Apple,
  Search,
  Info,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { NUTRITION_ITEMS } from '../data/mockData';

interface NutritionPageProps {
  onOpenAI: (initialQuery?: string) => void;
  isHindi: boolean;
}

export const NutritionPage: React.FC<NutritionPageProps> = ({ onOpenAI, isHindi }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedDishId, setExpandedDishId] = useState<string | null>(NUTRITION_ITEMS[0]?.id || null);

  const categories = [
    'All',
    'Breakfast',
    'Lentils & Curries',
    'Dairy',
    'Staples',
    'Produce',
    'Snacks',
  ];

  const filteredItems = NUTRITION_ITEMS.filter(item => {
    const nutrients = item.keyIngredients || item.vitaminsAndMinerals || [];
    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hindiName.includes(searchQuery) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nutrients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0B2545] text-white rounded-xl p-6 sm:p-10 border border-[#1E3A5F] shadow-md gov-grid-pattern relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#071A33] border border-[#1E3A5F] text-[#FBBF24] text-xs font-bold uppercase tracking-wider">
            <Apple className="w-3.5 h-3.5" />
            <span>{isHindi ? 'भारतीय पोषण एवं आहार विज्ञान पंजिका' : 'ICMR-NIN Aligned Nutrition Registry'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {isHindi ? 'अपने भोजन का पोषण समझें' : 'Public Nutrition & Food Literacy'}
          </h1>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            Reference macronutrient balances, glycemic index indicators, and kitchen safety guidance
            for everyday Indian and Madhya Pradesh regional preparations.
          </p>
        </div>

        {/* AI Prompt CTA trigger */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenAI('What is the nutritional balance of Dal Bafla and Poha?')}
            className="px-4 py-2.5 rounded-lg bg-[#B45309] text-white text-xs font-bold hover:bg-[#92400E] transition-colors flex items-center gap-2 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FDE68A]" />
            <span>Consult Aahar AI on Meal Nutrition</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#CBD5E1] flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#475569]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search dish or micronutrient (e.g. Poha, Iron, Paneer)..."
            className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-[#CBD5E1] text-sm text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
          />
        </div>

        {/* Food Group Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar w-full lg:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? 'bg-[#0B2545] text-white border-[#0B2545]'
                  : 'bg-white border-[#CBD5E1] text-[#334155] hover:bg-[#EEF2F6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Food Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(dish => {
          const isExpanded = expandedDishId === dish.id;
          const portion = dish.portionSize || dish.servingSize;
          const fatValue = dish.fats ?? dish.fat;
          const nutrients = dish.keyIngredients || dish.vitaminsAndMinerals || [];
          const safetyGuidance = dish.foodSafetyTip || dish.healthTip;

          const giColor =
            dish.glycemicIndex === 'Low'
              ? 'bg-[#ECFDF5] text-[#14532D] border-[#86EFAC]'
              : dish.glycemicIndex === 'Medium'
              ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
              : 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]';

          return (
            <div
              key={dish.id}
              className="bg-white rounded-xl border border-[#CBD5E1] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-5 space-y-4">
                {/* Top Title & GI Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B45309] block mb-0.5">
                      {dish.category}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[#0B2545] leading-tight">
                      {dish.name}
                    </h3>
                    <span className="text-xs text-[#475569] font-medium">
                      {dish.hindiName} · {portion}
                    </span>
                  </div>
                  <span
                    className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-md border shrink-0 ${giColor}`}
                    title={`Glycemic Index: ${dish.glycemicIndex}`}
                  >
                    GI: {dish.glycemicIndex}
                  </span>
                </div>

                {/* Macronutrient Ledger */}
                <div className="grid grid-cols-4 gap-2 text-center py-3 px-2.5 bg-[#EEF2F6] rounded-lg border border-[#CBD5E1] tabular-nums">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#475569] block">
                      Calories
                    </span>
                    <span className="text-sm font-black text-[#0B2545]">
                      {dish.calories}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#475569] block">
                      Protein
                    </span>
                    <span className="text-sm font-black text-[#14532D]">
                      {dish.protein}g
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#475569] block">
                      Carbs
                    </span>
                    <span className="text-sm font-black text-[#B45309]">
                      {dish.carbs}g
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#475569] block">
                      Fat
                    </span>
                    <span className="text-sm font-black text-[#334155]">
                      {fatValue}g
                    </span>
                  </div>
                </div>

                {/* Micronutrients & Composition */}
                <div className="space-y-1.5">
                  <span className="text-[10.5px] uppercase font-bold text-[#475569] tracking-wider block">
                    Key Vitamins, Minerals & Fibre ({dish.fiber}g fibre):
                  </span>
                  <p className="text-xs text-[#334155] leading-relaxed">
                    {nutrients.join(' · ')}
                  </p>
                </div>

                {/* Expandable Safety & Nutrition Guidance */}
                {isExpanded && (
                  <div className="pt-3 border-t border-[#E2E8F0] space-y-2 text-xs">
                    <div className="flex items-start gap-2.5 text-[#0F172A] bg-[#F8FAFC] p-3 rounded-lg border border-[#CBD5E1]">
                      <ShieldCheck className="w-4 h-4 text-[#14532D] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[11px] uppercase font-bold text-[#0B2545] mb-0.5">
                          Nutritional Science & Hygiene Note:
                        </strong>
                        <p className="text-[11.5px] text-[#334155] leading-snug">
                          {safetyGuidance}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom toggle / ask AI button */}
              <div className="px-5 py-3 bg-[#F8FAFC] border-t border-[#CBD5E1] flex items-center justify-between text-xs">
                <button
                  onClick={() => setExpandedDishId(isExpanded ? null : dish.id)}
                  className="font-bold text-[#0B2545] hover:text-[#B45309] flex items-center gap-1"
                >
                  <span>{isExpanded ? 'Hide Advisory' : 'Read Science & Safety Tip'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() =>
                    onOpenAI(`Tell me about the nutritional balance and safe preparation of ${dish.name}`)
                  }
                  className="text-xs font-bold text-[#B45309] hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Ask Aahar AI</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimers Card */}
      <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#CBD5E1] text-xs text-[#475569] flex items-start gap-3 max-w-3xl">
        <Info className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#0B2545]">Public Educational Reference:</strong> Nutritional values and
          glycemic estimates follow standard ICMR-NIN Indian recipe benchmarks. Actual energy density
          varies with oil/ghee quantities and portion sizes.
        </div>
      </div>
    </div>
  );
};
