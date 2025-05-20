
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export type ProgrammingLanguage = 'javascript' | 'python' | 'html' | 'css' | 'typescript' | 'java' | 'csharp';

interface LanguageSelectorProps {
  selectedLanguage: ProgrammingLanguage;
  onSelectLanguage: (language: ProgrammingLanguage) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onSelectLanguage,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Language:</span>
      <Select
        value={selectedLanguage}
        onValueChange={(value) => onSelectLanguage(value as ProgrammingLanguage)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="javascript">JavaScript</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="html">HTML</SelectItem>
          <SelectItem value="css">CSS</SelectItem>
          <SelectItem value="typescript">TypeScript</SelectItem>
          <SelectItem value="java">Java</SelectItem>
          <SelectItem value="csharp">C#</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
