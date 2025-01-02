import { Clock, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" text-gray-900 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/assets/logo.png" alt="Whisked logo" className="h-14" />
            <div className="flex flex-col ">
              <span className="text-2xl font-bold text-red-900">
                Whisked Cafe
              </span>
              <span className="mt-[-.2rem] text-gray-700">by Ericka</span>
            </div>
          </Link>

          <div>
            <h3 className="font-bold text-gray-900">About us</h3>
            <div className="mt-4 flex items-start gap-2 text-gray-700">
              <Clock className="h-8 w-8" />
              <span>Mon - Fri: 9:00 AM to 6:00 PM</span>
              <span>Sat - Sun: 9:00 AM to 4:00 PM</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-gray-700">
              <MapPin className="h-5 w-5" />
              <span>Congresional Road, Caloocan City </span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Contact us</h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="h-5 w-5" />
                <span>+63 932 321 323 3</span>
              </div>
            </div>
          </div>

          {/* <div>
            <h3 className="font-semibold">Follow us</h3>
            <p className="mt-4 text-gray-400">
              Connect with us on social media
            </p>
          </div> */}
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-600">
          <p>© All Rights Reserved © Whisked Cafe</p>
        </div>
      </div>
    </footer>
  );
}
