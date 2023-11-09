import { CalendarDays, HeartHandshake, HelpCircle, Home } from "lucide-react";
import Welcome from "../Welcome/Welcome";

function Navbar() {
  return (
    <nav
      className="-right-2 w-fit flex justify-end mt-4 fixed mr-8 bg-yellow-400 rounded-md p-1 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 z-50
"
    >
      <div>
        <ul className="flex text-white gap-3 z-50 justify-center">
          <li>
            <a href="#home">
              <Home size={28} strokeWidth={1} color="orange" />
            </a>
          </li>
          <li>
            <a href="#activity">
              <HelpCircle size={28} strokeWidth={1} color="orange" />
            </a>
          </li>
          <li>
            <a href="#calendar">
              <CalendarDays size={28} strokeWidth={1} color="orange" />
            </a>
          </li>
          <li>
            <a href="#contact">
              <HeartHandshake size={28} strokeWidth={1} color="orange" />
            </a>
          </li>
        </ul>
        <Welcome />
      </div>
    </nav>
  );
}

export default Navbar;
