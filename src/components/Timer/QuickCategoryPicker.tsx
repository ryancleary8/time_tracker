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
          </button>
        );
      })}
    </div>
  );
};

export default QuickCategoryPicker;
