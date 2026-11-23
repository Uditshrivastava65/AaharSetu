import React, { useState } from 'react';
import {
  Apple,
  Search,
  Filter,
  Flame,
  Info,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { NUTRITION_ITEMS } from '../data/mockData';
import { NutritionItem } from '../types';

interface NutritionPageProps {
  onOpenAI: (initialQuery?: string) => void;
  isHindi: boolean;
}

export const NutritionPage: React.FC<NutritionPageProps> = ({ onOpenAI, isHindi }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [expandedDishId, setExpandedDishId] = useState<string | null>(NUTRITION_ITEMS[0].id);

  const tags = [
    'All',
    'High-Protein',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Diabetic-Friendly',
    'Regional Specialty',
  ];

  const filteredItems = NUTRITION_ITEMS.filter(item => {
    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hindiName.includes(searchQuery) ||
      item.keyIngredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag =
      selectedTag === 'All' || item.dietarySuitability.includes(selectedTag as any);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-10 border border-[#E6DDD0] relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#D97724] text-xs font-bold uppercase tracking-wider">
            <Apple className="w-3.5 h-3.5" />
            <span>{isHindi ? 'भारतीय पोषण ज्ञानकोष' : 'Nutrition Awareness Portal'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#163828] tracking-tight">
            {isHindi ? 'अपने भोजन का पोषण समझें' : 'Understand What You Eat'}
          </h1>
          <p className="text-sm sm:text-base text-[#525F56] leading-relaxed">
            Educational nutrition profiles and culinary science for popular Indian and regional
            dishes. Learn macronutrient balances, glycemic ratings, and kitchen hygiene safety tips.
          </p>
        </div>

        {/* AI Prompt CTA trigger */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenAI('What is the nutritional balance of Dal Bafla?')}
            className="px-4 py-2 rounded-xl bg-[#163828] text-white text-xs font-bold hover:bg-[#1f4a36] transition-colors flex items-center gap-2 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E28738]" />
            <span>Ask Aahar AI about custom recipes</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7E8B83]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search dish name (e.g. Poha, Dal Bafla, Paneer)..."
            className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-[#D5CBC0] text-sm text-[#163828] focus:outline-none focus:ring-2 focus:ring-[#163828]"
          />
        </div>

        {/* Dietary suitability tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar w-full sm:w-auto">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? 'bg-[#163828] text-white'
                  : 'bg-white border border-[#D5CBC0] text-[#55635B] hover:bg-[#EDE6DC]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Food Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(dish => {
          const isExpanded = expandedDishId === dish.id;

          const giColor =
            dish.glycemicIndex === 'Low'
              ? 'bg-[#EBF7EE] text-[#1B5E20] border-[#C8E6C9]'
              : dish.glycemicIndex === 'Medium'
              ? 'bg-[#FEF7EC] text-[#B45309] border-[#FDE68A]'
              : 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]';

          return (
            <div
              key={dish.id}
              className="bg-white rounded-2xl border border-[#E6DFD5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-5 space-y-4">
                {/* Top Title & GI Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-extrabold text-[#163828] leading-tight">
                      {dish.name}
                    </h3>
                    <span className="text-xs text-[#829087] font-medium font-sans">
                      {dish.hindiName} • {dish.portionSize}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${giColor}`}
                    title={`Glycemic Index: ${dish.glycemicIndex}`}
                  >
                    GI: {dish.glycemicIndex}
                  </span>
                </div>

                {/* Macronutrient Pills */}
                <div className="grid grid-cols-4 gap-2 text-center py-3 px-2.5 bg-[#FAF7F2] rounded-xl border border-[#ECE5DA]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#839188] block">
                      Calories
                    </span>
                    <span className="text-sm font-black text-[#163828]">
                      {dish.calories}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#839188] block">
                      Protein
                    </span>
                    <span className="text-sm font-black text-[#2D7A4D]">
                      {dish.protein}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#839188] block">
                      Carbs
                    </span>
                    <span className="text-sm font-black text-[#D97724]">
                      {dish.carbs}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#839188] block">
                      Fats
                    </span>
                    <span className="text-sm font-black text-[#69776E]">
                      {dish.fats}
                    </span>
                  </div>
                </div>

                {/* Key Ingredients */}
                <div className="space-y-1">
                  <span className="text-[10.5px] uppercase font-bold text-[#839188] tracking-wider block">
                    Core Ingredients:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {dish.keyIngredients.map(ing => (
                      <span
                        key={ing}
                        className="text-xs bg-[#FAF8F5] border border-[#E6DFD5] px-2 py-0.5 rounded text-[#4E5C53]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dietary Badges */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {(Array.isArray(dish.dietarySuitability)
                    ? dish.dietarySuitability
                    : dish.dietarySuitability
                    ? [dish.dietarySuitability]
                    : []
                  ).map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF7EE] text-[#1B5E20]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Expandable Safety & Hygiene Tips */}
                {isExpanded && (
                  <div className="pt-3 border-t border-[#F0EAE1] space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-[#2F4735] bg-[#F4FAF6] p-2.5 rounded-xl border border-[#D3E8DA]">
                      <ShieldCheck className="w-4 h-4 text-[#2D7A4D] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[11px] uppercase font-bold text-[#163828]">
                          Food Safety & Kitchen Practice:
                        </strong>
                        <p className="text-[11.5px] text-[#475C4D] leading-snug">
                          {dish.foodSafetyTip}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom toggle / ask AI button */}
              <div className="px-5 py-3 bg-[#FAF8F5] border-t border-[#E6DFD5] flex items-center justify-between text-xs">
                <button
                  onClick={() => setExpandedDishId(isExpanded ? null : dish.id)}
                  className="font-bold text-[#163828] hover:text-[#D97724] flex items-center gap-1"
                >
                  <span>{isExpanded ? 'Hide Safety Tip' : 'Food Safety Tip'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() =>
                    onOpenAI(`Tell me about the health benefits and digestion of ${dish.name}`)
                  }
                  className="text-xs font-semibold text-[#D97724] hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimers Card */}
      <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E6DFD5] text-xs text-[#6F7D75] flex items-start gap-3 max-w-3xl">
        <Info className="w-4 h-4 text-[#D97724] shrink-0 mt-0.5" />
        <div>
          <strong>Educational Awareness Disclaimer:</strong> Nutritional figures and glycemic indices
          are reference estimates based on standard Indian recipes (ICMR-NIN guidelines). Exact
          caloric counts vary based on commercial preparation styles, ghee/oil portions, and
          serving quantities.
        </div>
      </div>
    </div>
  );
};
