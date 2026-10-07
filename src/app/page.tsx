import { Navigation, BootSequence, ProjectDialog } from "@/components/shell";
import { Motion } from "@/animations/motion";
import { Hero } from "@/sections/hero";
import { Problem } from "@/sections/problem";
import { Engine } from "@/sections/engine";
import { Featured } from "@/sections/featured";
import { Voice } from "@/sections/voice";
import { Services, Technology } from "@/sections/services";
import { Process, About, Philosophy } from "@/sections/about";
import { Contact } from "@/sections/contact";

export default function Home() {
  return <><BootSequence/><Navigation/><main id="main"><Hero/><Problem/><Engine/><Featured/><Voice/><Services/><Technology/><Process/><About/><Philosophy/><Contact/></main><ProjectDialog/><Motion/></>;
}
