"use client";

import { Button } from "@losaweb/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@losaweb/ui/components/dialog";

import { motion } from "framer-motion";
import Image from "next/image";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@losaweb/ui/components/tabs";
import { Badge } from "@losaweb/ui/components/badge";
import { cn } from "@losaweb/ui/lib/utils";
import { Separator } from "@losaweb/ui/components/separator";
import getMercenaryData from "@losaweb/database/mercenary";

export function MercenaryDetail({ mercenary_id }: { mercenary_id: number }) {
  const mercenary = getMercenaryData("en");
  const mercenaryInfo = mercenary.find(
    (mercenary) => mercenary.id === mercenary_id
  );

  if (!mercenaryInfo) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="View Hero"
          className="group relative m-2 w-full overflow-hidden rounded-md bg-emerald-600 p-2 text-center text-sm font-bold transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-500"
        >
          View Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg lg:max-w-[1000px] ">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            {mercenaryInfo?.name}
            <Badge variant="secondary">
              {mercenaryInfo.id.toString().padStart(3, "0")}
            </Badge>
            <Badge
              className={cn(
                "bg-gray-700 flex h-6 w-20 items-center justify-center rounded-md px-1 text-xs font-semibold text-white",
                {
                  "bg-blue-700 hover:bg-blue-800":
                    mercenaryInfo.type === "Premium",
                  "bg-orange-700 hover:bg-orange-800":
                    mercenaryInfo.type === "Rare",
                  "bg-purple-700 hover:bg-purple-800":
                    mercenaryInfo.type === "Unique",
                  "bg-green-700 hover:bg-green-800":
                    mercenaryInfo.type === "Reform",
                  "bg-pink-700 hover:bg-pink-800":
                    mercenaryInfo.type === "Idol",
                }
              )}
            >
              {mercenaryInfo.type}
            </Badge>
            <Badge className="bg-gray-700 mr-2 flex h-6 w-20 items-center justify-center rounded-md px-1 text-xs font-semibold text-white">
              {mercenaryInfo.AttackType}
            </Badge>
          </DialogTitle>
          <DialogDescription>{mercenaryInfo?.description}</DialogDescription>
        </DialogHeader>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="flex justify-center items-center">
            <Tabs defaultValue="images" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
              </TabsList>
              <TabsContent
                value="images"
                className="flex justify-center items-center w-full"
              >
                {/* Male Image */}
                <motion.div
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                >
                  <Image
                    src={mercenaryInfo.image_male}
                    alt={`${mercenaryInfo?.name} Male`}
                    width={800}
                    height={800}
                    onError={(e) => {
                      e.currentTarget.hidden = true;
                    }}
                    className="rounded-lg h-48 w-48 md:h-52 md:w-52 object-cover flex-shrink-0"
                  />
                </motion.div>
                {/* Female Image */}
                <motion.div
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                >
                  <Image
                    src={mercenaryInfo.image_female}
                    alt={`${mercenaryInfo?.name} Female`}
                    width={500}
                    height={500}
                    onError={(e) => {
                      e.currentTarget.hidden = true;
                    }}
                    onErrorCapture={(e) => {
                      e.currentTarget.hidden = true;
                    }}
                    className="rounded-lg h-48 w-48 md:h-52 md:w-52 object-cover flex-shrink-0"
                  />
                </motion.div>
              </TabsContent>
              <TabsContent value="video">
                {mercenaryInfo.video && (
                  <iframe
                    width="560"
                    height="315"
                    src={mercenaryInfo?.video}
                    allowFullScreen
                    className="w-full rounded-md my-5"
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
          <Separator className="lg:hidden my-4" />
          <div>
            {mercenaryInfo?.skills?.map((skill) => (
              <div
                className="flex space-x-4 rounded-xl dark:bg-white p-3 drop-shadow-lg shadow-lg space-y-2 mt-2"
                key={skill.id}
              >
                {/* <Image
                            src={skill.icon}
                            width={100}
                            height={100}
                            alt={skill.name}
                            className="skillbox aspect-auto w-16 lg:rounded-lg bg-center lg:object-cover object-contain"
                        /> */}
                <div>
                  <span className="absolute top-0 right-0 text-white font-thin text-sm bg-blue-700 rounded-r-md px-5 py-1 text-right">
                    {skill.type}
                  </span>

                  <h4 className="font-semibold mt-3 dark:text-slate-900 lg:mt-0">
                    {skill.name}
                  </h4>
                  <p className="text-sm text-slate-400">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>{/* Optional footer */}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
