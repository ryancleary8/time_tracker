<<<<<<< ours
import { categories, Category } from '../../constants/categories';

type QuickCategoryPickerProps = {
  onPick: (category: Category) => void;
  selectedId?: string | null;
  className?: string;
};

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

const QuickCategoryPicker = ({
  onPick,
  selectedId,
  className,
}: QuickCategoryPickerProps) => {
  return (
    <div className={cx('flex flex-wrap gap-2', className)}>
      {categories.map((category) => {
        const isSelected = category.id === selectedId;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onPick(category)}
            className={cx(
              'rounded-full px-3 py-1 text-sm font-medium transition focus:outline-none focus-visible:ring focus-visible:ring-offset-2',
              isSelected
                ? 'text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
            )}
            style={{
              backgroundColor: isSelected ? category.accent : 'transparent',
              border: `1px solid ${category.accent}`,
            }}
            aria-pressed={isSelected}
            aria-label={`Select ${category.name}`}
          >
            {category.name}
=======
interface QuickCategoryPickerProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const QuickCategoryPicker = ({ categories, selected, onSelect }: QuickCategoryPickerProps) => (
  <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Quick Categories</h2>
    <div className="mt-4 flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = category === selected;
        return (
          <button
            type="button"
            key={category}
            onClick={() => onSelect(category)}
            className={`rounded-full border px-4 py-1 text-sm transition-colors ${
              isActive
                ? 'border-primary-600 bg-primary-600 text-white'
                : 'border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200'
            }`}
          >
            {category}
>>>>>>> theirs
          </button>
        );
      })}
    </div>
<<<<<<< ours
  );
};
=======
  </div>
);
>>>>>>> theirs

export default QuickCategoryPicker;
