/* eslint-disable react/prop-types */
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import LoadingImage from "./LoadingImage";
import useDisplayProfilePicInterests from "../../hooks/DisplayProfilePicInterests";

const BetterDropDownMenu = ({
  name,
  email,
  address,
  phone,
  username,
  imagePath,
}) => {
  const { userProfilePic, loadingImage, imageError } =
    useDisplayProfilePicInterests({ imagePath });

  return (
    <div className="fixed top-24 w-52 text-right font-mono">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          {username}
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            <MenuItem>
              <div className="avatar mx-auto">
                {userProfilePic ? (
                  <div className="w-24 rounded-full">
                    <img src={userProfilePic} />
                  </div>
                ) : loadingImage ? (
                  <LoadingImage />
                ) : (
                  <p>{`Error loading image: ${imageError?.message}`}</p>
                )}
              </div>
            </MenuItem>
            <MenuItem>
              <a>name : {name}</a>
            </MenuItem>
            <MenuItem>
              <a>email : {email}</a>
            </MenuItem>
            <MenuItem>
              <a>address : {address}</a>
            </MenuItem>
            <MenuItem>
              <a>phone : {phone}</a>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default BetterDropDownMenu;
