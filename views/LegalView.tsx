
import React from 'react';
import SecondaryHeader from '../components/SecondaryHeader';

interface LegalViewProps {
  title: string;
  content: string;
  onBack: () => void;
}

const LegalView: React.FC<LegalViewProps> = ({ title, content, onBack }) => {
  return (
    <div className="h-full bg-white dark:bg-background-dark flex flex-col">
      <SecondaryHeader title={title} onBack={onBack} />
      <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalView;
