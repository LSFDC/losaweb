"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@losaweb/ui/components/card";
import { useState } from "react";
import { Label } from "@losaweb/ui/components/label";
import { Input } from "@losaweb/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@losaweb/ui/components/popover";
import { Button } from "@losaweb/ui/components/button";
import { cn } from "@losaweb/ui/lib/utils";
import { QuestClassList } from "@/lib/constant/quest";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@losaweb/ui/components/command";
import { ScrollArea, ScrollBar } from "@losaweb/ui/components/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@losaweb/ui/components/tabs";
import { QuestPreview } from "@/components/tools/quest/quest-preview";

interface Quest {
  className: string;
  mainIndex: string;
  maxSubQuest: string;
  subQuest: SubQuest[];
}

interface SubQuest {
  title: string;
  icon: string;
  progress: string;
  progressResult: string;
  help: string;
  performType: string;
  channelingType: number;
  pcRoomStyle: string;
  repeatStyle: string;
  oneDayStyle: string;
  startTime: DateTime;
  endTime: DateTime;
  occurValue: string;
  completeValue: string;
  periodHour: number;
  completeRoomStyle: string;
  playCompleteShow: string;
  playOccurShow: string;
  maxReward: number;
  rewardPresent1: string;
  prevMainIndex: number;
  prevSubIndex: number;
  nextMainIndex: number;
  nextSubIndex: number;
  customValue1: string;
  customValue2: string;
  customValue3: string;
  customValue4: string;
}

interface DateTime {
  year: number;
  month: number;
  date: number;
  hour: number;
}

const createEmptySubQuest = (): SubQuest => ({
  title: "",
  icon: "",
  progress: "",
  progressResult: "",
  help: "",
  performType: "",
  channelingType: 0,
  pcRoomStyle: "",
  repeatStyle: "",
  oneDayStyle: "",
  startTime: { year: 0, month: 0, date: 0, hour: 0 },
  endTime: { year: 0, month: 0, date: 0, hour: 0 },
  occurValue: "",
  completeValue: "",
  periodHour: 0,
  completeRoomStyle: "",
  playCompleteShow: "",
  playOccurShow: "",
  maxReward: 0,
  rewardPresent1: "",
  prevMainIndex: 0,
  prevSubIndex: 0,
  nextMainIndex: 0,
  nextSubIndex: 0,
  customValue1: "",
  customValue2: "",
  customValue3: "",
  customValue4: "",
});

export function QuestGen() {
  const [questdata, setQuestData] = useState<Quest>({
    className: "",
    mainIndex: "1",
    maxSubQuest: "1",
    subQuest: [createEmptySubQuest()],
  });

  const handleMaxSubQuestChange = (value: string) => {
    const newMaxSubQuest = parseInt(value, 10);
    const currentSubQuestLength = questdata.subQuest.length;

    let newSubQuest = [...questdata.subQuest];

    if (newMaxSubQuest > currentSubQuestLength) {
      for (let i = currentSubQuestLength; i < newMaxSubQuest; i++) {
        newSubQuest.push(createEmptySubQuest());
      }
    } else if (newMaxSubQuest < currentSubQuestLength) {
      newSubQuest = newSubQuest.slice(0, newMaxSubQuest);
    }

    setQuestData({
      ...questdata,
      maxSubQuest: value,
      subQuest: newSubQuest,
    });
  };

  const handleSubQuestChange = (
    index: number,
    field: keyof SubQuest,
    value: any
  ) => {
    setQuestData((prev) => {
      const newSubQuest = [...prev.subQuest];
      if (!newSubQuest[index]) {
        newSubQuest[index] = createEmptySubQuest();
      }
      newSubQuest[index] = {
        ...newSubQuest[index],
        [field]: value,
      };
      return {
        ...prev,
        subQuest: newSubQuest,
      };
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Generator */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <form action="" className="space-y-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="class_name">Class Name</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !questdata.className && "text-muted-foreground"
                      )}
                    >
                      {questdata.className
                        ? QuestClassList.find(
                            (quest) => quest.value === questdata.className
                          )?.label
                        : "Select Class Name"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
                    <Command>
                      <CommandInput placeholder="Search class name..." />
                      <CommandList>
                        <ScrollArea viewportRef={null} className="h-64">
                          <CommandEmpty>No class name found.</CommandEmpty>
                          <CommandGroup>
                            {QuestClassList.map((quest) => (
                              <CommandItem
                                value={quest.label}
                                key={quest.value}
                                onSelect={() => {
                                  setQuestData({
                                    ...questdata,
                                    className: quest.value,
                                  });
                                }}
                              >
                                {quest.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    quest.value === questdata.className
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="mainIndex">Main Index</Label>
                  <Input
                    type="text"
                    id="mainIndex"
                    name="mainIndex"
                    value={questdata.mainIndex}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) =>
                      setQuestData({
                        ...questdata,
                        mainIndex: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="maxSubQuest">Max Sub Quest</Label>
                  <Input
                    type="number"
                    id="maxSubQuest"
                    name="maxSubQuest"
                    value={questdata.maxSubQuest}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => handleMaxSubQuestChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-5">
                {parseInt(questdata.maxSubQuest, 10) > 0 && (
                  <Tabs defaultValue="sub1" className="">
                    <ScrollArea
                      viewportRef={null}
                      className="w-full whitespace-break-spaces overflow-clip"
                    >
                      <TabsList>
                        {Array.from({
                          length: parseInt(questdata.maxSubQuest, 10),
                        }).map((_, index) => (
                          <TabsTrigger
                            key={index}
                            value={`sub${index + 1}`}
                            className="flex flex-col"
                          >
                            Sub{index + 1}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    {Array.from({
                      length: parseInt(questdata.maxSubQuest, 10),
                    }).map((_, index) => (
                      <TabsContent
                        className="space-y-5 mt-5"
                        key={`sub${index + 1}`}
                        value={`sub${index + 1}`}
                      >
                        <div className="flex flex-col gap-2">
                          <Label htmlFor={`title-${index}`}>Sub Title</Label>
                          <Input
                            type="text"
                            id={`title-${index}`}
                            name={`title-${index}`}
                            value={questdata.subQuest[index]?.title ?? ""}
                            onChange={(e) =>
                              handleSubQuestChange(
                                index,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor={`icon-${index}`}>Sub Icon</Label>
                          <Input
                            type="text"
                            id={`icon-${index}`}
                            name={`icon-${index}`}
                            value={questdata.subQuest[index]?.icon ?? ""}
                            onChange={(e) =>
                              handleSubQuestChange(
                                index,
                                "icon",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        {/* Add more subQuest fields here using the same pattern */}
                      </TabsContent>
                    ))}
                  </Tabs>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <QuestPreview />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
