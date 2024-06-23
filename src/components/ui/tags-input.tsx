import { Tag, TagInput } from "emblor";
import { useState } from "react";

export const TagsInput = () => {
  const tags = [
    {
      id: "2839369706",
      text: "Sports",
    },
    {
      id: "977161915",
      text: "Programming",
    },
    {
      id: "3818271806",
      text: "Travel",
    },
  ];
  const [exampleTags, setExampleTags] = useState<Tag[]>(tags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <TagInput
      tags={exampleTags}
      setTags={newTags => {
        setExampleTags(newTags);
      }}
      placeholder="Add a tag"
      className="sm:max-w-[350px]"
      activeTagIndex={activeTagIndex}
      setActiveTagIndex={setActiveTagIndex}
      shape={"default"}
    />
  );
};
