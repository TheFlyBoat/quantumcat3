import React from 'react';
import { cn } from '@/lib/utils';

const MYSTIC_STYLES = `
    .cat.mystic {
        animation: mystic-float 6s infinite ease-in-out;
    }

    @keyframes mystic-float {
        0%, 100% { transform: translate(-50%, 0); }
        50% { transform: translate(-50%, -2%); }
    }

    @keyframes mystic-color-cycle {
        from { filter: hue-rotate(-15deg) brightness(1.05); }
        to { filter: hue-rotate(15deg) brightness(1.15); }
    }

    .mystic-tail {
        animation: mystic-tail-sway 5s infinite ease-in-out, mystic-color-cycle 11s infinite linear alternate;
        transform-origin: 450px 3000px;
    }

    @keyframes mystic-tail-sway {
        50% { transform: rotate(-8deg) translateX(-20px); }
    }

    .mystic-ear {
        animation: mystic-color-cycle 9s infinite linear alternate;
    }

    .mystic-ear-right {
        animation-delay: 0.7s;
    }

    .mystic-eye {
        animation: mystic-blink 7s infinite ease-in-out 1s;
        transform-origin: center;
    }

    @keyframes mystic-blink {
        0%, 95%, 100% { transform: scaleY(1); }
        97.5% { transform: scaleY(0.1); }
    }

    .eye-highlight {
        animation: mystic-highlight-shimmer 3s infinite ease-in-out alternate;
        transform-origin: center;
    }

    @keyframes mystic-highlight-shimmer {
        from { opacity: 1; transform: scale(1.1); }
        to { opacity: 0.6; transform: scale(0.9); }
    }

    .mystic-whisker-left {
        animation: mystic-whisker-twitch-left 4.5s infinite ease-in-out;
        transform-origin: 1600px 2200px;
    }

    .mystic-whisker-right {
        animation: mystic-whisker-twitch-right 4.5s infinite ease-in-out 0.3s;
        transform-origin: 2800px 2200px;
    }

    @keyframes mystic-whisker-twitch-left {
        0%, 10%, 100% { transform: rotate(0deg); }
        5% { transform: rotate(4deg); }
    }

    @keyframes mystic-whisker-twitch-right {
        0%, 10%, 100% { transform: rotate(0deg); }
        5% { transform: rotate(-4deg); }
    }

    .mystic-sparkle {
        animation: mystic-sparkle-twinkle 3s infinite ease-in-out alternate;
        transform-origin: center;
    }

    @keyframes mystic-sparkle-twinkle {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0.4; transform: scale(0.9); }
    }

    .mystic-sparkle[data-sparkle-id="2"],
    .mystic-sparkle[data-sparkle-id="6"],
    .mystic-sparkle[data-sparkle-id="8"],
    .mystic-sparkle[data-sparkle-id="12"],
    .mystic-sparkle[data-sparkle-id="15"] {
        animation:
            mystic-sparkle-twinkle 3s infinite ease-in-out alternate,
            mystic-color-cycle 7s infinite linear alternate;
    }

    .mystic-sparkle[data-sparkle-id="1"] { animation-delay: 0.1s; }
    .mystic-sparkle[data-sparkle-id="2"] { animation-delay: 0.8s, 1.2s; }
    .mystic-sparkle[data-sparkle-id="3"] { animation-delay: 0.3s; }
    .mystic-sparkle[data-sparkle-id="4"] { animation-delay: 0.6s; }
    .mystic-sparkle[data-sparkle-id="5"] { animation-delay: 1.2s; }
    .mystic-sparkle[data-sparkle-id="6"] { animation-delay: 0.2s, 0.5s; }
    .mystic-sparkle[data-sparkle-id="7"] { animation-delay: 1.5s; }
    .mystic-sparkle[data-sparkle-id="8"] { animation-delay: 0.9s, 1.4s; }
    .mystic-sparkle[data-sparkle-id="9"] { animation-delay: 1.8s; }
    .mystic-sparkle[data-sparkle-id="10"] { animation-delay: 0.4s; }
    .mystic-sparkle[data-sparkle-id="11"] { animation-delay: 1.1s; }
    .mystic-sparkle[data-sparkle-id="12"] { animation-delay: 1.6s, 0.3s; }
    .mystic-sparkle[data-sparkle-id="13"] { animation-delay: 0.5s; }
    .mystic-sparkle[data-sparkle-id="14"] { animation-delay: 1.3s; }
    .mystic-sparkle[data-sparkle-id="15"] { animation-delay: 0.7s, 1.1s; }
    .mystic-sparkle[data-sparkle-id="16"] { animation-delay: 1.0s; }
`;

const MysticFigure: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        fillRule="evenodd"
        clipRule="evenodd"
        imageRendering="optimizeQuality"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        viewBox="0 0 4363 3772"
        width="100%"
        height="100%"
    >
        <defs>
            <style>{`
                .fil6{fill:#fff}.fil3{fill:#00a0e4}.fil0{fill:#dbc2f5}.fil5{fill:#eca9dc}.fil1{fill:#faf6fb}.fil4{fill:#fceeb2}.fil2{fill:#3a3285;fill-rule:nonzero}
            `}</style>
        </defs>
        <g id="Layer_x0020_1">
            <path d="M3171 2883c184-149 250-291 288-512 27-155 5-331-30-485-30-132-72-260-133-381-166-330-329-463-668-569-177-55-344-74-528-45-246 38-476 133-651 311-159 162-273 413-330 632-64 246-82 544 23 782 28 64 65 121 111 173 9 10 16 21 23 32-3 3-5 6-8 9l1902 54z" className="fil0" />
            <path d="M3210 2718c-21 25-45 45-76 60-575 11-1147 0-1722 0-30 0-38-4-62-23-44-33-74-77-100-125-33-60-58-124-73-191-7-30-15-70-15-101-12-134-7-270 22-402 22-97 52-192 90-284 47-116 106-225 184-323 82-104 158-159 275-213 121-56 220-93 354-118 76-14 153-14 230-12 109 2 200 30 302 60 181 53 290 131 418 255 30 29 53 64 77 98 55 77 96 163 132 250 35 83 62 169 83 257 66 267 69 593-120 811z" className="fil1" />
            <path d="M1658 1965c-3 65 14 122 52 173 49 65 114 100 196 100 72 0 133-30 183-81 91-93 87-227 9-327-58-74-159-110-248-83-108 32-176 102-191 218z" className="fil2 mystic-eye" />
            <path d="M2368 1965c-3 65 14 122 52 173 49 65 114 100 196 100 72 0 133-30 183-81 91-93 87-227 9-327-58-74-159-110-248-83-108 32-176 102-191 218z" className="fil2 mystic-eye" />
            <path d="M2585 1918c27 14 73 10 92 98 8-11 18-65 62-85 14-6 23-5 35-13-24-14-43-17-61-33-19-16-20-36-34-62-13 28-14 45-33 62-14 12-43 22-61 33" className="fil3 eye-highlight" />
            <path d="M1885 1924c27 14 73 10 92 98 8-11 18-65 62-85 14-6 23-5 35-13-24-14-43-17-61-33-19-16-20-36-34-62-13 28-14 45-33 62-14 12-43 22-61 33" className="fil3 eye-highlight" />
            <path d="M1486 237c-26-32-128-34-162-78-17-22-29-50-38-82-8-25-16-83-45-77-24 5-28 56-37 83-24 78-53 96-126 119-21 7-90 16-70 52 8 14 93 30 130 49 82 43 60 211 114 185 20-10 28-90 48-135 20-44 69-61 110-73 17-5 33-8 50-13 23-6 27-5 26-31z" className="fil0 mystic-sparkle" data-sparkle-id="1" />
            <path d="M342 621v29c81 38 111-3 148 134 10 36 1 57 40 53 21-31 18-92 48-130 35-45 136-40 120-78-28-28-79-17-117-66-25-33-28-104-50-131-52-5-25 62-64 123-26 41-77 49-125 66" className="fil4 mystic-sparkle" data-sparkle-id="2" />
            <path d="M445 1559v29c81 38 111-3 148 134 10 36 1 57 40 53 21-31 18-92 48-130 35-45 136-40 120-78-28-28-79-17-117-66-25-33-28-104-50-131-52-5-25 62-64 123-26 41-77 49-125 66" className="fil4 mystic-sparkle" data-sparkle-id="3" />
            <path d="M4005 1235v29c81 38 111-3 148 134 10 36 1 57 40 53 21-31 18-92 48-130 35-45 136-40 120-78-28-28-79-17-117-66-25-33-28-104-50-131-52-5-25 62-64 123-26 41-77 49-125 66" className="fil4 mystic-sparkle" data-sparkle-id="4" />
            <path d="M3339 204c6 43 81 25 113 75 24 36 37 126 49 137 36 19 40-93 65-130 38-58 124-44 121-79-5-44-104 7-140-144-7-30-5-61-37-61-34 11-6 134-107 170-25 9-52 11-64 31z" className="fil0 mystic-sparkle" data-sparkle-id="5" />
            <path d="M3781 728c-30 1-58 1-88 2-33 2-60-4-61 32 24 23 110 14 149 15 19 59-19 149 21 160 5 1 4 2 9 0 34-7 20-106 19-160 30-1 59-1 90-1 34 0 64 8 69-28-21-28-104-19-158-20 1-31 2-64 1-96 0-26 3-67-28-65-38 3-14 130-24 161z" className="fil4 mystic-sparkle" data-sparkle-id="6" />
            <path d="M3884 1666c-30 1-58 1-88 2-33 2-60-4-61 32 24 23 110 14 149 15 19 59-19 149 21 160 5 1 4 2 9 0 34-7 20-106 19-160 30-1 59-1 90-1 34 0 64 8 69-28-21-28-104-19-158-20 1-31 2-64 1-96 0-26 3-67-28-65-38 3-14 130-24 161z" className="fil5 mystic-sparkle" data-sparkle-id="7" />
            <path d="M149 1146c-30 1-58 1-88 2-33 2-60-4-61 32 24 23 110 14 149 15 19 59-19 149 21 160 5 1 4 2 9 0 34-7 20-106 19-160 30-1 59-1 90-1 34 0 64 8 69-28-21-28-104-19-158-20 1-31 2-64 1-96 0-26 3-67-28-65-38 3-14 130-24 161z" className="fil5 mystic-sparkle" data-sparkle-id="8" />
            <path d="M872 1072c-27 1-139-11-120 33 24 26 82 11 121 16-2 43-8 112 8 145l29 1c18-35 11-102 10-147 34 0 71 1 102-5 19-53-27-43-102-41V942c-2-15-4-21-23-19-39 4-20 114-24 149z" className="fil0 mystic-sparkle" data-sparkle-id="9" />
            <path d="M1966 185c-27 1-139-11-120 33 24 26 82 11 121 16-2 43-8 112 8 145l29 1c18-35 11-102 10-147 34 0 71 1 102-5 19-53-27-43-102-41V55c-2-15-4-21-23-19-39 4-20 114-24 149z" className="fil0 mystic-sparkle" data-sparkle-id="10" />
            <path d="M3624 2846c25 13 68 9 87 92 8-11 17-61 58-80 13-6 21-5 33-12-22-13-40-16-58-31s-19-33-32-58c-12 26-13 42-31 58-13 11-40 20-57 31" className="fil5 mystic-sparkle" data-sparkle-id="11" />
            <path d="M325 2180c31 16 83 11 106 112 10-13 21-74 71-97 16-7 26-6 41-15-27-16-49-20-70-37-22-18-23-41-39-70-15 32-16 51-38 70-16 14-49 25-70 38z" className="fil0 mystic-sparkle" data-sparkle-id="12" />
            <path d="M3928 2496c31 16 83 11 106 112 10-13 21-74 71-97 16-7 26-6 41-15-27-16-49-20-70-37-22-18-23-41-39-70-15 32-16 51-38 70-16 14-49 25-70 38z" className="fil4 mystic-sparkle" data-sparkle-id="13" />
            <path d="M78 1824c25 13 68 9 87 92 8-11 17-61 58-80 13-6 21-5 33-12-22-13-40-16-58-31s-19-33-32-58c-12 26-13 42-31 58-13 11-40 20-57 31" className="fil5 mystic-sparkle" data-sparkle-id="14" />
            <path d="M2701 501c25 13 68 9 87 92 8-11 17-61 58-80 13-6 21-5 33-12-22-13-40-16-58-31s-19-33-32-58c-12 26-13 42-31 58-13 11-40 20-57 31" className="fil5 mystic-sparkle" data-sparkle-id="15" />
            <path d="M4111 2119c33 17 90 12 114 121 10-14 23-80 77-105 17-8 28-6 44-16-29-17-53-21-76-40s-25-44-42-76c-16 35-17 55-41 76-18 15-53 27-76 41z" className="fil5 mystic-sparkle" data-sparkle-id="16" />
            <path d="M412 3002c3 16 6 31 9 47 15 60 44 112 84 158 75 87 171 141 281 169 53 13 107 20 161 31 49 10 97 22 146 32 8 2 11 6 11 14 3 69 11-227 11-244-101-18-207-38-306-59-26-6-53-15-76-28-48-28-68-95-45-145 27-59 121-95 177-115 14-5 29-9 43-14 4-1 8-3 10-6 16-28 29-57 26-90-7-85-68-142-152-127-101 19-195 57-274 127-58 51-93 114-105 192-1 20-1 39-1 58" className="fil5 mystic-tail" />
            <path d="M2910 1057c-9-24-61-163-59-180 3-29-9-47-41-62-7 0-12 1-17 1-23 11-38 30-49 54-13 27-29 64-43 94l210 94z" className="fil0 mystic-ear mystic-ear-right" />
            <path d="M1754 995c-9 4-16 3-24 0-99-44-198-87-296-132-17-7-36-24-53-28-7-1-12-1-17-1-15 7-29 15-36 31-6 13-8 26-2 39 37 79 83 173 124 249 9 17 10 43-1 56l47-12 260-204z" className="fil0 mystic-ear mystic-ear-left" />
            <path d="M1102 3445c1 2 2 5 2 8 5 121 23 197 58 310 2 8 8 6 13 6l1831 3c12 0 16-3 18-15 44-201 81-500 17-702-22-68-47-108-76-169 7-35 15-48 8-79H1268c13 19 1 25-17 44-66 70-120 252-135 355-11 77-14 162-14 240z" className="fil0" />
            <path d="M1204 3445c-1-49-5-96-4-144 4-143 32-284 127-396 13-16 30-22 49-22 87-1 174-2 261-2 153 0 305 1 458 2h621c26 0 52-1 77-2 35-2 60 14 79 41 45 68 80 141 95 221 12 62 16 165 14 228-4 104-18 186-32 287l-3 15h-243c15-38 19-96-2-133-16-28-48-19-47 4 2 35 21 52 7 95-4 11-6 22-8 34h-47c2-7 5-13 6-19 7-31 8-63 0-94-2-10-8-19-14-27-15-22-49-10-41 22 4 18 11 36 11 54 0 20-7 40-12 59 0 2-4 4-7 5h-64c3-11 6-22 8-33 6-34 5-68-11-100-14-29-49-21-47 3 3 36 21 50 7 94-4 11-6 23-9 36h-504c-10 0-13-3-15-12-3-15-8-29-10-43-4-27 12-60 13-71 1-35-56-42-61 42-2 28-1 56 11 84h-72c-5-20-12-40-13-60-1-19 12-54 12-70 0-25-38-33-52 10-14 40-11 82 4 121h-42c-2 0-6-3-7-6-4-13-6-26-10-39-6-24 1-46 8-68 13-43-31-50-45-19-17 40-20 91-1 132h-399c-8 0-13 0-15-10-7-45-16-90-22-135-4-28-6-56-9-85z" className="fil1" />
            <path d="M2335 2308c-52 24-104 23-156 2-14-6-26-15-27-32-1-47 125-67 186-29 18 11 26 27 17 40-5 8-13 13-21 20z" className="fil5" />
            <path d="M838 2334c-24-4-47-39-25-49 57-27 752-11 767-2 19 10 12 55-48 52-123-5-606 11-694-1m11-243c-23-6-43-47-20-56 59-24 750 58 764 68 18 13 6 61-53 53-122-17-605-44-691-65" className="fil5 mystic-whisker mystic-whisker-left" />
            <path d="M3685 2088c23-6 43-47 20-56-59-24-750 58-764 68-18 13-6 61 53 53 122-17 605-44 691-65m11 243c24-4 47-39 25-49-57-27-752-11-767-2-19 10-12 55 48 52 123-5 606 11 694-1" className="fil5 mystic-whisker mystic-whisker-right" />
            <path stroke="#eca9dc" strokeMiterlimit="2.613" strokeWidth="67" d="M2548 867c1 84-30 152-87 208-18 17-14 17-40 34-17 11-28 18-48 26-189 79-413-35-418-273-38 21-84 118-91 176-10 83 8 157 44 219 32 56 78 100 135 131 132 73 295 72 425-2 150-85 230-285 142-447-11-21-39-61-60-72z" className="fil4" />
            <path d="M2602 1933c18 9 49 7 63 66 6-8 12-44 42-58 9-4 15-3 24-9-16-9-29-12-42-22-13-11-13-24-23-42-9 19-9 30-22 42-10 8-29 15-41 22z" className="fil6 eye-highlight" />
            <path d="M1897 1939c18 9 49 7 63 66 6-8 12-44 42-58 9-4 15-3 24-9-16-9-29-12-42-22-13-11-13-24-23-42-9 19-9 30-22 42-10 8-29 15-41 22z" className="fil6 eye-highlight" />
        </g>
    </svg>
);

export const MysticCatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('relative cat mystic', className)}>
        <style>{MYSTIC_STYLES}</style>
        <MysticFigure />
    </div>
);
