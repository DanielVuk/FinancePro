import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import AtmRoundedIcon from "@mui/icons-material/AtmRounded";
import BeachAccessRoundedIcon from "@mui/icons-material/BeachAccessRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded";
import CarRepairRoundedIcon from "@mui/icons-material/CarRepairRounded";
import CasinoRoundedIcon from "@mui/icons-material/CasinoRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import CellWifiRoundedIcon from "@mui/icons-material/CellWifiRounded";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import ChurchRoundedIcon from "@mui/icons-material/ChurchRounded";
import CleanHandsRoundedIcon from "@mui/icons-material/CleanHandsRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EmailIcon from "@mui/icons-material/Email";
import FamilyRestroomRoundedIcon from "@mui/icons-material/FamilyRestroomRounded";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import FlightRoundedIcon from "@mui/icons-material/FlightRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import LiquorRoundedIcon from "@mui/icons-material/LiquorRounded";
import LocalGasStationRoundedIcon from "@mui/icons-material/LocalGasStationRounded";
import LockIcon from "@mui/icons-material/Lock";
import PaletteIcon from "@mui/icons-material/Palette";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import CircleIcon from "@mui/icons-material/Circle";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Avatar } from "@mui/material";
import send from "../assets/send.png";

const GetIcon = ({ iconName, color = null, size = "" }) => {
    switch (iconName) {
        case "sendTo":
            return <Avatar src={send} sx={{ width: 27, height: 27 }} />;

        case "add":
            return (
                <AddCircleOutlineRoundedIcon
                    fontSize={size}
                    sx={{ color: color }}
                />
            );

        case "delete":
            return <DeleteIcon fontSize={size} sx={{ color: color }} />;

        case "palette":
            return <PaletteIcon fontSize={size} sx={{ color: color }} />;

        case "car":
            return (
                <CarRepairRoundedIcon fontSize={size} sx={{ color: color }} />
            );

        case "school":
            return <SchoolRoundedIcon fontSize={size} sx={{ color: color }} />;

        case "casino":
            return <CasinoRoundedIcon fontSize={size} sx={{ color: color }} />;

        case "family":
            return (
                <FamilyRestroomRoundedIcon
                    fontSize={size}
                    sx={{ color: color }}
                />
            );

        case "gym":
            return (
                <FitnessCenterRoundedIcon
                    fontSize={size}
                    sx={{ color: color }}
                />
            );

        case "food":
            return (
                <FastfoodRoundedIcon fontSize={size} sx={{ color: color }} />
            );

        case "restaurant":
            return (
                <RestaurantMenuRoundedIcon
                    fontSize={size}
                    sx={{ color: color }}
                />
            );

        case "gift":
            return (
                <CardGiftcardRoundedIcon
                    fontSize={size}
                    sx={{ color: color }}
                />
            );

        case "travel":
            return <FlightRoundedIcon fontSize={size} sx={{ color: color }} />;

        case "bank":
            return (
                <AccountBalanceRoundedIcon
                    fontSize={size}
                    sx={{ color: color }}
                />
            );

        case "fuel":
            return (
                <LocalGasStationRoundedIcon
                    fontSize={size}
                    sx={{ color: color }}
                />
            );

        case "drink":
            return <LiquorRoundedIcon fontSize={size} sx={{ color: color }} />;

        case "laptop":
            return <LaptopMacIcon fontSize={size} sx={{ color: color }} />;

        case "other":
            return (
                <InsertDriveFileRoundedIcon
                    fontSize={size}
                    sx={{ color: color }}
                />
            );

        case "shop":
            return (
                <AddShoppingCartRoundedIcon
                    fontSize={size}
                    sx={{ color: color }}
                />
            );

        case "internet":
            return (
                <CellWifiRoundedIcon fontSize={size} sx={{ color: color }} />
            );

        case "cloth":
            return (
                <CheckroomRoundedIcon fontSize={size} sx={{ color: color }} />
            );

        case "work":
            return (
                <WorkOutlineRoundedIcon fontSize={size} sx={{ color: color }} />
            );

        case "wallet":
            return (
                <AccountBalanceWalletRoundedIcon
                    fontSize={size}
                    sx={{ color: color }}
                />
            );

        case "clean":
            return (
                <CleanHandsRoundedIcon fontSize={size} sx={{ color: color }} />
            );

        case "beach":
            return (
                <BeachAccessRoundedIcon fontSize={size} sx={{ color: color }} />
            );

        case "celebration":
            return (
                <CelebrationRoundedIcon fontSize={size} sx={{ color: color }} />
            );

        case "church":
            return <ChurchRoundedIcon fontSize={size} sx={{ color: color }} />;

        case "dolar":
            return (
                <CurrencyExchangeRoundedIcon
                    fontSize={size}
                    sx={{ color: color }}
                />
            );

        case "apartment":
            return (
                <ApartmentRoundedIcon fontSize={size} sx={{ color: color }} />
            );

        case "call":
            return <CallRoundedIcon fontSize={size} sx={{ color: color }} />;
        case "atm":
            return <AtmRoundedIcon fontSize={size} sx={{ color: color }} />;

        case "edit":
            return <EditRoundedIcon fontSize={size} sx={{ color: color }} />;

        case "email":
            return <EmailIcon fontSize={size} sx={{ color: color }} />;

        case "lock":
            return <LockIcon fontSize={size} sx={{ color: color }} />;

        case "date":
            return (
                <DateRangeRoundedIcon fontSize={size} sx={{ color: color }} />
            );
        case "circle":
            return <CircleIcon fontSize={size} sx={{ color: color }} />;
        case "close":
            return <CloseRoundedIcon fontSize={size} sx={{ color: color }} />;
        default:
            return null;
    }
};

export default GetIcon;
