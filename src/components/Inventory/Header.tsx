import { faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Header() {
    return (
        <div className="p-3 pb-0 border-t ">
            <div className="mx-16">
                <h1 className="text-3xl font-extrabold">BOOKS</h1>
            </div>
            <div className="flex justify-center border-b">
                <div className="mr-8">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon className="size-4 mt-1 text-blue-600" icon={faShop} />
                        <span className="font-bold text-lg text-blue-600">Inventory</span>
                    </div>
                    <div className="border-b-4 border-blue-600 mt-1"></div>
                </div>
            </div>

        </div>
    )
}
