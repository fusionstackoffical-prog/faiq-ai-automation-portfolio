import { Navigation } from "@/components/shell";
import { Motion } from "@/animations/motion";
import { Hero } from "@/sections/hero";
import { Engine } from "@/sections/engine";
import { Featured } from "@/sections/featured";
import { Voice } from "@/sections/voice";
import { Services, Technology } from "@/sections/services";
import { Process, About, Philosophy } from "@/sections/about";
import { Contact } from "@/sections/contact";

export default function Home() {
  return <><Navigation/><main id="main"><Hero/><About/><Voice/><Services/><Featured/><Engine/><Technology/><Process/><Philosophy/><Contact/></main><Motion/></>;
}
