import { Navigation } from "@/components/shell";
import { Motion } from "@/animations/motion";
import { Hero } from "@/sections/hero";
import { Featured } from "@/sections/featured";
import { Services } from "@/sections/services";
import { Process, About } from "@/sections/about";
import { Simulation } from "@/sections/simulation";
import { MoreExplorers } from "@/components/explorers";
import { Contact } from "@/sections/contact";

export default function Home() {
  return <><Navigation/><main id="main"><Hero/><About/><Services/><Featured/><Simulation/><MoreExplorers/><Process/><Contact/></main><Motion/></>;
}
