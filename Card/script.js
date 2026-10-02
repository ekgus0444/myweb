/* =========================================================
   기본 설정
========================================================= */

const WALL_WIDTH = 10000;
const WALL_HEIGHT = 5000;

const STORAGE_KEY = "heartWallMessagesV5";



/* =========================================================
   요소 가져오기
========================================================= */

const memoryIntro =
    document.getElementById("memoryIntro");

const memoryScenes =
    document.querySelectorAll(".memory-scene");

const memoryProgressBar =
    document.getElementById("memoryProgressBar");

const memoryCopy1 =
    document.getElementById("memoryCopy1");

const memoryCopy2 =
    document.getElementById("memoryCopy2");

const memoryCopy3 =
    document.getElementById("memoryCopy3");

const memoryEnding =
    document.getElementById("memoryEnding");

const camTime =
    document.getElementById("camTime");


const intro =
    document.getElementById("intro");

const mainPage =
    document.getElementById("mainPage");

const wallViewport =
    document.getElementById("wallViewport");

const wall =
    document.getElementById("wall");

const graffitiLayer =
    document.getElementById("graffitiLayer");


const searchModal =
    document.getElementById("searchModal");

const writeModal =
    document.getElementById("writeModal");

const completeModal =
    document.getElementById("completeModal");

const adModal =
    document.getElementById("adModal");


const receiver =
    document.getElementById("receiver");

const messageInput =
    document.getElementById("messageInput");

const messagePreview =
    document.getElementById("messagePreview");

const charCount =
    document.getElementById("charCount");


const searchInput =
    document.getElementById("searchInput");

const searchResult =
    document.getElementById("searchResult");


const positionText =
    document.getElementById("positionText");

const zoomText =
    document.getElementById("zoomText");

const heartCount =
    document.getElementById("heartCount");



/* =========================================================
   MEMORY INTRO
========================================================= */

const MEMORY_DURATION = 17000;

let memoryFinished = false;

let memoryTimers = [];



function memoryTimer(callback, delay) {

    const timer =
        setTimeout(callback, delay);

    memoryTimers.push(timer);

}



/* =========================================================
   장면 변경
========================================================= */

function changeMemoryScene(index) {

    memoryScenes.forEach(
        function(scene, sceneIndex) {

            scene.classList.toggle(
                "active",
                sceneIndex === index
            );

        }
    );

}



/* =========================================================
   MEMORY INTRO 시작
========================================================= */

function playMemoryIntro() {

    /*
        진행바
    */

    requestAnimationFrame(
        function() {

            memoryProgressBar.style.transition =
                `width ${MEMORY_DURATION}ms linear`;

            memoryProgressBar.style.width =
                "100%";

        }
    );


    /*
        장면 1
    */

    changeMemoryScene(0);


    memoryTimer(
        function() {

            memoryCopy1.classList.add("show");

        },
        500
    );


    /*
        장면 2
    */

    memoryTimer(
        function() {

            memoryCopy1.classList.remove("show");

            changeMemoryScene(1);

            camTime.innerText =
                "PM 05:42";

        },
        3500
    );


    memoryTimer(
        function() {

            memoryCopy2.classList.add("show");

        },
        4100
    );


    /*
        장면 3
    */

    memoryTimer(
        function() {

            memoryCopy2.classList.remove("show");

            changeMemoryScene(2);

            camTime.innerText =
                "PM 05:43";

        },
        7000
    );


    /*
        장면 4
    */

    memoryTimer(
        function() {

            changeMemoryScene(3);

            memoryCopy3.classList.add("show");

            camTime.innerText =
                "PM 05:45";

        },
        9800
    );


    /*
        장면 5
    */

    memoryTimer(
        function() {

            memoryCopy3.classList.remove("show");

            changeMemoryScene(4);

            camTime.innerText =
                "PM 06:12";

        },
        12500
    );


    /*
        마지막 질문
    */

    memoryTimer(
        function() {

            memoryEnding.classList.add("show");

        },
        14000
    );


    /*
        감성 인트로로 이동
    */

    memoryTimer(
        function() {

            finishMemoryIntro();

        },
        MEMORY_DURATION
    );

}



/* =========================================================
   MEMORY INTRO 종료
========================================================= */

function finishMemoryIntro() {

    if (memoryFinished) {
        return;
    }


    memoryFinished = true;


    memoryTimers.forEach(
        function(timer) {

            clearTimeout(timer);

        }
    );


    memoryIntro.style.transition =
        "opacity 1s ease";


    memoryIntro.style.opacity =
        "0";


    setTimeout(
        function() {

            memoryIntro.style.display =
                "none";


            intro.classList.add("show");

        },
        950
    );

}



/* =========================================================
   SKIP
========================================================= */

document
    .getElementById("skipMemory")
    .addEventListener(
        "click",
        finishMemoryIntro
    );



/* =========================================================
   메인 벽 입장
========================================================= */

document
    .getElementById("enterBtn")
    .addEventListener(
        "click",
        function() {

            intro.style.transition =
                "opacity .8s ease";


            intro.style.opacity =
                "0";


            setTimeout(
                function() {

                    intro.style.display =
                        "none";


                    mainPage.style.display =
                        "block";


                    goHome(false);

                },
                800
            );

        }
    );



/* =========================================================
   MODAL
========================================================= */

document
    .getElementById("searchBtn")
    .onclick =
    function() {

        searchModal.classList.add("show");


        setTimeout(
            function() {

                searchInput.focus();

            },
            100
        );

    };


document
    .getElementById("writeBtn")
    .onclick =
    function() {

        writeModal.classList.add("show");

    };


document
    .querySelectorAll(".close-modal")
    .forEach(
        function(button) {

            button.onclick =
            function() {

                button
                    .closest(".modal")
                    .classList
                    .remove("show");

            };

        }
    );


document
    .querySelectorAll(".modal")
    .forEach(
        function(modal) {

            modal.addEventListener(
                "mousedown",
                function(event) {

                    if (
                        event.target === modal
                    ) {

                        modal.classList.remove("show");

                    }

                }
            );

        }
    );



/* =========================================================
   벽 드래그
========================================================= */

let dragging = false;

let startX = 0;
let startY = 0;

let startScrollX = 0;
let startScrollY = 0;


wallViewport.addEventListener(
    "mousedown",
    function(event) {

        if (
            event.target.closest(".ad-object")
        ) {
            return;
        }


        dragging = true;


        startX =
            event.clientX;

        startY =
            event.clientY;


        startScrollX =
            wallViewport.scrollLeft;

        startScrollY =
            wallViewport.scrollTop;


        wallViewport.classList.add("dragging");

    }
);


window.addEventListener(
    "mousemove",
    function(event) {

        if (!dragging) {
            return;
        }


        event.preventDefault();


        wallViewport.scrollLeft =
            startScrollX -
            (
                event.clientX -
                startX
            );


        wallViewport.scrollTop =
            startScrollY -
            (
                event.clientY -
                startY
            );

    }
);


window.addEventListener(
    "mouseup",
    function() {

        dragging = false;

        wallViewport.classList.remove("dragging");

    }
);



/* =========================================================
   ZOOM
========================================================= */

let zoom = 1;


document
    .getElementById("zoomIn")
    .onclick =
    function() {

        changeZoom(
            zoom + .1
        );

    };


document
    .getElementById("zoomOut")
    .onclick =
    function() {

        changeZoom(
            zoom - .1
        );

    };


function changeZoom(newZoom) {

    newZoom =
        Math.max(
            .45,
            Math.min(
                1.5,
                newZoom
            )
        );


    const centerX =
        (
            wallViewport.scrollLeft +
            wallViewport.clientWidth / 2
        ) / zoom;


    const centerY =
        (
            wallViewport.scrollTop +
            wallViewport.clientHeight / 2
        ) / zoom;


    zoom =
        Number(
            newZoom.toFixed(2)
        );


    wall.style.transform =
        `scale(${zoom})`;


    wall.style.marginRight =
        `${
            WALL_WIDTH * zoom -
            WALL_WIDTH
        }px`;


    wall.style.marginBottom =
        `${
            WALL_HEIGHT * zoom -
            WALL_HEIGHT
        }px`;


    zoomText.innerText =
        Math.round(
            zoom * 100
        ) +
        "%";


    wallViewport.scrollLeft =
        centerX * zoom -
        wallViewport.clientWidth / 2;


    wallViewport.scrollTop =
        centerY * zoom -
        wallViewport.clientHeight / 2;

}



/* =========================================================
   중앙으로
========================================================= */

function goHome(smooth = true) {

    wallViewport.scrollTo({

        left:
            WALL_WIDTH *
            zoom /
            2 -
            wallViewport.clientWidth /
            2,

        top:
            WALL_HEIGHT *
            zoom /
            2 -
            wallViewport.clientHeight /
            2,

        behavior:
            smooth
                ? "smooth"
                : "auto"

    });

}


document
    .getElementById("homeBtn")
    .onclick =
    function() {

        goHome();

    };



/* =========================================================
   현재 벽 위치
========================================================= */

wallViewport.addEventListener(
    "scroll",
    updatePosition
);


function updatePosition() {

    const x =
        (
            wallViewport.scrollLeft +
            wallViewport.clientWidth / 2
        ) /
        zoom;


    const y =
        (
            wallViewport.scrollTop +
            wallViewport.clientHeight / 2
        ) /
        zoom;


    let column =
        Math.floor(
            x /
            (
                WALL_WIDTH /
                10
            )
        );


    let row =
        Math.floor(
            y /
            (
                WALL_HEIGHT /
                10
            )
        ) +
        1;


    column =
        Math.max(
            0,
            Math.min(
                9,
                column
            )
        );


    row =
        Math.max(
            1,
            Math.min(
                10,
                row
            )
        );


    const letter =
        String.fromCharCode(
            65 +
            column
        );


    positionText.innerText =
        `${letter}-${row}`;

}



/* =========================================================
   200명 정도의 낙서 데이터
========================================================= */

const graffitiTexts = [

    "민지 ♡ 현우",
    "지수 ♥ 민석",
    "J ♥ S",
    "H + Y",
    "우리 오래오래 ♡",
    "100일 ♡",
    "오늘부터 1일",
    "우리 결혼하자",
    "다음에도 같이 오자",
    "수진아 사랑해",
    "보고싶다",
    "너랑 와서 좋았다",
    "2022.08.14 ♡",
    "우리 첫 데이트",
    "평생 같이 먹자",
    "나중에 애기랑 또 오자",
    "오늘도 사랑해",
    "오래오래 행복하자",
    "현정아 나랑 결혼해줘",
    "S ♡ J FOREVER",

    "우리 우정 영원히",
    "민수 왔다감",
    "철수 왔다감ㅋㅋ",
    "김해 F4 방문",
    "96년생 모임",
    "동창회 2차",
    "졸업하고 다시 오자",
    "시험 끝!!!",
    "취업하면 내가 쏜다",
    "오늘 민수가 계산함",
    "재훈이 생일 ★",
    "우리 10년째 친구",
    "다음엔 5명 다 오자",
    "OO고 3학년 2반",
    "대학 붙자 제발",
    "이번엔 내가 산다",
    "친구야 고맙다",
    "우리 늙어서도 오자",

    "김치찌개 개맛있음",
    "제육 미쳤다",
    "계란말이 꼭 먹어라",
    "여기 찐맛집",
    "★★★★★",
    "별 다섯개도 부족함",
    "사장님 최고",
    "잘 먹었습니다!",
    "또 올게요 사장님",
    "여기 진짜 맛있음ㅋㅋ",
    "김치찌개 인정",
    "제육은 무조건 시켜라",
    "볶음밥 필수",
    "소주가 술술 들어감",
    "여기 왜 이제 알았지",
    "숨은 맛집 발견",
    "안주 미쳤음",
    "사장님 오래오래 장사해주세요",
    "배터지게 먹고 갑니다",
    "밥 두공기 먹음",
    "김치가 진짜임",
    "여기 된장찌개 미쳤음",
    "공기밥 추가함ㅋㅋ",
    "다음엔 삼겹살 먹는다",

    "소주 3병째\n나는 멀쩡하다",
    "취하면 연락하지 말자",
    "전여친 전화 금지",
    "오늘 기억할 수 있을까",
    "한병만 먹는다며",
    "집에 가자",
    "나 안취했음",
    "진짜 마지막 한잔",
    "내일 출근인데...",
    "왜 월요일이지",
    "술이 달다",
    "오늘만 마신다",
    "사장님 한병 더요",
    "2차 어디감?",
    "누가 나 좀 집에 보내줘",
    "택시비 없다",
    "오늘 내가 쏜다",
    "월급날이다!!!",
    "내일부터 금주",
    "금주 1일차 실패",

    "다 잘될거야",
    "고생했다",
    "행복하자",
    "오늘도 버텼다",
    "취업하게 해주세요",
    "시험 붙게 해주세요",
    "로또 1등 되게 해주세요",
    "부자되자",
    "건강하자",
    "엄마 아빠 사랑해",
    "아빠 고마워",
    "엄마 미안해",
    "오늘보다 내일이 낫겠지",
    "언젠간 괜찮아지겠지",
    "지나고 보면 추억",
    "우리 모두 행복하자",
    "하고 싶은 거 하고 살자",
    "오늘도 수고했어",
    "잘될거야 진짜로",
    "포기하지 말자",

    "퇴사하고 싶다",
    "퇴사 D-?",
    "부장님 보고있습니까",
    "오늘도 야근",
    "월급 어디갔냐",
    "월급날까지 D-12",
    "내일 출근 실화냐",
    "회사 가기 싫다",
    "팀장님 저는 여기 있습니다",
    "퇴근하고 여기옴",
    "회식 2차 탈출 실패",
    "연봉 올려주세요",
    "일 안하고 돈 벌고 싶다",

    "시험 망함",
    "A+ 주세요",
    "교수님 살려주세요",
    "과제하기 싫다",
    "수능 대박",
    "중간고사 D-3",
    "공부하자...",
    "내일부터 진짜 공부",
    "졸업시켜주세요",
    "취업시켜주세요",
    "학점 4.5 가자",
    "과제 제출 완료!!!",
    "공부보다 제육",

    "군대 D-32",
    "전역 D-100",
    "휴가 나왔다!!!",
    "복귀하기 싫다",
    "전역하면 또 온다",
    "말년병장 왔다감",
    "충성",
    "전역했다!!!",
    "민간인 최고",

    "사장님 최고",
    "서비스 감사합니다 ♡",
    "사장님 건강하세요",
    "20년 뒤에도 와야지",
    "사장님 오래오래 해주세요",
    "여기 없어지면 안됨",
    "단골 인증",
    "5년째 오는 중",
    "10년째 오는 중",

    "여기 앉으면 부자됨",
    "이 글 보면 로또 사라",
    "뒤돌아보지마",
    "당신 뒤에...",
    "사실 아무것도 없음ㅋㅋ",
    "이걸 읽고있네",
    "공부해라",
    "핸드폰 그만봐",
    "집에 가",
    "다이어트 내일부터",
    "내일부터 운동함",
    "미래의 나야 미안하다",
    "이 글씨 아직 있네?",
    "지우지 마세요 제발",
    "심심해서 씀",
    "내 글 찾는중",

    "ㅋㅋㅋㅋㅋㅋ",
    "ㅇㅈ",
    "누구냐",
    "나임",
    "뭐보냐",
    "여기 내자리",
    "건들지마",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "LOVE",
    "FOREVER",
    "GOOD LUCK",
    "HI",
    "BYE",
    "♡",
    "♡♡♡",
    "★★★★★",
    "☆",
    "???",
    "!!!",
    "왔다감",
    "또 옴",
    "배고파",
    "배부르다",
    "졸리다",
    "집가고싶다",

    "2018.03.17",
    "2019.11.02",
    "2020.05.21",
    "2020.12.25",
    "2021.03.02",
    "2021.08.19",
    "2022.02.14",
    "2022.08.17",
    "2023.01.01",
    "2023.06.21",
    "2023.12.31",
    "2024.05.18",
    "2024.10.03",
    "2025.02.14",
    "2025.08.22",
    "2026.01.01"

];



/* =========================================================
   대화형 낙서
========================================================= */

const graffitiConversations = [

    [
        "수진아 사랑해",
        "↓",
        "수진이가 누군데",
        "↓",
        "내 와이프",
        "↓",
        "멋있다 형"
    ],

    [
        "소주 3병째\n나는 멀쩡하다",
        "↓",
        "글씨부터 안 멀쩡함"
    ],

    [
        "다이어트 내일부터",
        "↓",
        "2021",
        "↓",
        "아직도 안함?"
    ],

    [
        "여기 앉으면\n내년에 부자됨",
        "↓",
        "3년째 기다리는 중"
    ],

    [
        "김치찌개 개맛있음",
        "↑",
        "ㅇㅈ",
        "↑",
        "난 제육"
    ],

    [
        "군대 D-32",
        "↓",
        "ㅋㅋㅋㅋㅋㅋ",
        "↓",
        "전역했냐",
        "↓",
        "했습니다 형님\n2023.06.21"
    ],

    [
        "J ♥ S\n2020.11.23",
        "↓",
        "2024년에 결혼함",
        "↓",
        "축하한다 모르는 사람아"
    ],

    [
        "취하면 전여친한테\n전화하지 말 것",
        "↓",
        "이미 함"
    ],

    [
        "오늘 민수가 계산함",
        "↓",
        "내가 왜?",
        "↓",
        "생일이잖아ㅋㅋ"
    ],

    [
        "여기 소개팅 성공 맛집임",
        "↓",
        "난 실패함",
        "↓",
        "힘내라"
    ],

    [
        "퇴사한다",
        "↓",
        "했냐?",
        "↓",
        "아직...",
        "↓",
        "2025년에도 다님"
    ],

    [
        "로또 1등 되게 해주세요",
        "↓",
        "되면 밥사라",
        "↓",
        "아직 안됨"
    ],

    [
        "내일부터 금주",
        "↓",
        "어제도 봤는데?",
        "↓",
        "조용히 해"
    ],

    [
        "사장님 오래오래 해주세요",
        "↓",
        "진짜 없어지면 안됨",
        "↓",
        "ㅇㅈ"
    ]

];



/* =========================================================
   낙서 생성
========================================================= */

function createGraffiti() {

    graffitiLayer.innerHTML =
        "";


    for (
        let i = 0;
        i < 210;
        i++
    ) {

        const graffiti =
            document.createElement("span");


        const text =
            graffitiTexts[
                (
                    i * 17
                ) %
                graffitiTexts.length
            ];


        let x =
            180 +
            (
                (
                    i * 1171 +
                    430
                ) %
                9500
            );


        let y;


        if (
            i % 3 === 0
        ) {

            y =
                1700 +
                (
                    (
                        i * 683 +
                        910
                    ) %
                    2700
                );

        }

        else {

            y =
                200 +
                (
                    (
                        i * 683 +
                        910
                    ) %
                    4400
                );

        }


        /*
            메뉴판 주변에도 낙서 밀집
        */

        if (
            i >= 170 &&
            i < 185
        ) {

            x =
                4100 +
                (
                    (
                        i * 117
                    ) %
                    900
                );


            y =
                1250 +
                (
                    (
                        i * 93
                    ) %
                    1500
                );

        }


        /*
            광고 주변
        */

        if (
            i >= 185 &&
            i < 198
        ) {

            x =
                5300 +
                (
                    (
                        i * 137
                    ) %
                    1000
                );


            y =
                850 +
                (
                    (
                        i * 101
                    ) %
                    1500
                );

        }


        /*
            벽 아래쪽
        */

        if (
            i >= 198
        ) {

            x =
                2500 +
                (
                    (
                        i * 449
                    ) %
                    5000
                );


            y =
                3700 +
                (
                    (
                        i * 71
                    ) %
                    800
                );

        }


        const rotation =
            (
                (
                    i * 19
                ) %
                31
            ) -
            15;


        let size =
            17 +
            (
                (
                    i * 11
                ) %
                19
            );


        if (
            i % 17 === 0
        ) {

            size += 20;

        }


        if (
            i % 47 === 0
        ) {

            size += 27;

        }


        graffiti.className =
            "random-graffiti";


        if (
            i % 4 === 0
        ) {

            graffiti.classList.add("wine");

        }

        else if (
            i % 4 === 1
        ) {

            graffiti.classList.add("pencil");

        }

        else if (
            i % 4 === 2
        ) {

            graffiti.classList.add("brown");

        }

        else {

            graffiti.classList.add("blue");

        }


        graffiti.innerText =
            text;


        graffiti.style.left =
            x + "px";


        graffiti.style.top =
            y + "px";


        graffiti.style.fontSize =
            size + "px";


        graffiti.style.transform =
            `rotate(${rotation}deg)`;


        graffiti.style.opacity =
            0.23 +
            (
                i % 7
            ) *
            0.06;


        if (
            i % 5 === 0
        ) {

            graffiti.style.fontFamily =
                '"East Sea Dokdo"';

        }

        else if (
            i % 11 === 0
        ) {

            graffiti.style.fontFamily =
                '"Diphylleia"';

        }


        graffitiLayer.appendChild(graffiti);

    }


    createConversations();

    createWallDoodles();

    createHeartDoodles();

}



/* =========================================================
   대화형 낙서 생성
========================================================= */

function createConversations() {

    graffitiConversations.forEach(

        function(conversation, index) {

            const group =
                document.createElement("div");


            group.className =
                "graffiti-conversation";


            const x =
                500 +
                (
                    (
                        index * 911
                    ) %
                    8500
                );


            let y =
                650 +
                (
                    (
                        index * 521
                    ) %
                    3400
                );


            if (
                index % 4 === 0
            ) {

                y += 500;

            }


            group.style.left =
                x + "px";


            group.style.top =
                y + "px";


            group.style.transform =
                `rotate(${
                    (
                        (
                            index * 7
                        ) %
                        11
                    ) -
                    5
                }deg)`;


            conversation.forEach(

                function(text, lineIndex) {

                    const line =
                        document.createElement("div");


                    line.innerText =
                        text;


                    if (
                        lineIndex % 3 === 0
                    ) {

                        line.style.fontFamily =
                            '"Nanum Pen Script"';

                    }

                    else if (
                        lineIndex % 3 === 1
                    ) {

                        line.style.fontFamily =
                            '"East Sea Dokdo"';

                    }

                    else {

                        line.style.fontFamily =
                            '"Diphylleia"';

                    }


                    line.style.marginLeft =
                        (
                            (
                                lineIndex %
                                3
                            ) *
                            22
                        ) +
                        "px";


                    group.appendChild(line);

                }

            );


            graffitiLayer.appendChild(group);

        }

    );

}



/* =========================================================
   그림 낙서
========================================================= */

function createWallDoodles() {

    const doodles = [

`
 /\\_/\\
( o.o )
 > ^ <
`,

`
  _____
 /     \\
| 소주 |
 \\_____/
`,

`
  ☆
 ☆☆☆
  ☆
`,

`
  ☺
 /|\\
 / \\
`,

`
 ┌─────┐
 │ ㅋㅋ │
 └─────┘
`,

`
  /\\
 /  \\
/____\\
`,

`
  ☕
 ~~~
`,

`
 ♪ ♫
`,

`
 (•‿•)
`

    ];


    for (
        let i = 0;
        i < 24;
        i++
    ) {

        const doodle =
            document.createElement("pre");


        doodle.className =
            "wall-doodle";


        doodle.innerText =
            doodles[
                i %
                doodles.length
            ];


        doodle.style.left =
            (
                400 +
                (
                    (
                        i * 1481
                    ) %
                    9000
                )
            ) +
            "px";


        doodle.style.top =
            (
                300 +
                (
                    (
                        i * 827
                    ) %
                    4200
                )
            ) +
            "px";


        doodle.style.transform =
            `rotate(${
                (
                    (
                        i * 9
                    ) %
                    25
                ) -
                12
            }deg)`;


        graffitiLayer.appendChild(doodle);

    }

}



/* =========================================================
   하트 낙서
========================================================= */

function createHeartDoodles() {

    for (
        let i = 0;
        i < 20;
        i++
    ) {

        const heart =
            document.createElement("span");


        heart.className =
            "heart-doodle";


        heart.innerText =
            i % 3 === 0
                ? "♡♡"
                : "♡";


        heart.style.left =
            (
                300 +
                (
                    (
                        i * 1733
                    ) %
                    9200
                )
            ) +
            "px";


        heart.style.top =
            (
                250 +
                (
                    (
                        i * 619
                    ) %
                    4400
                )
            ) +
            "px";


        heart.style.fontSize =
            (
                30 +
                (
                    (
                        i * 13
                    ) %
                    50
                )
            ) +
            "px";


        heart.style.transform =
            `rotate(${
                (
                    (
                        i * 17
                    ) %
                    30
                ) -
                15
            }deg)`;


        graffitiLayer.appendChild(heart);

    }

}



/* =========================================================
   글 미리보기
========================================================= */

messageInput.addEventListener(
    "input",
    function() {

        charCount.innerText =
            messageInput.value.length;


        updatePreview();

    }
);


document
    .querySelectorAll(
        'input[name="font"]'
    )
    .forEach(
        function(radio) {

            radio.addEventListener(
                "change",
                function() {

                    updatePreview();


                    document
                        .getElementById("aiFontArea")
                        .style
                        .display =

                        this.value === "myFont"
                            ? "block"
                            : "none";

                }
            );

        }
    );


function updatePreview() {

    messagePreview.innerText =
        messageInput.value ||
        "당신의 마음이 이곳에 보여집니다.";


    const font =
        document.querySelector(
            'input[name="font"]:checked'
        ).value;


    if (
        font === "diphy"
    ) {

        messagePreview.style.fontFamily =
            '"Diphylleia"';

        messagePreview.style.fontSize =
            "20px";

    }

    else if (
        font === "dokdo"
    ) {

        messagePreview.style.fontFamily =
            '"East Sea Dokdo"';

        messagePreview.style.fontSize =
            "29px";

    }

    else {

        messagePreview.style.fontFamily =
            '"Nanum Pen Script"';

        messagePreview.style.fontSize =
            "30px";

    }

}



/* =========================================================
   AI 손글씨 데모
   현재는 실제 AI 생성이 아니라 UI 시연
========================================================= */

const handwritingFile =
    document.getElementById("handwritingFile");


handwritingFile.addEventListener(
    "change",
    function() {

        if (
            !this.files[0]
        ) {
            return;
        }


        const status =
            document.getElementById("aiStatus");


        status.innerText =
            "손글씨 특징을 분석하고 있습니다...";


        setTimeout(
            function() {

                status.innerText =
                    "✓ 손글씨 스타일이 준비되었습니다.";

            },
            1600
        );

    }
);



/* =========================================================
   LOCAL STORAGE
========================================================= */

function getMessages() {

    try {

        return (
            JSON.parse(
                localStorage.getItem(
                    STORAGE_KEY
                )
            )
            ||
            []
        );

    }

    catch(error) {

        return [];

    }

}


function saveMessage(data) {

    const messages =
        getMessages();


    messages.push(data);


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(messages)
    );

}



/* =========================================================
   좌표 생성
========================================================= */

function makeCoordinate() {

    let coordinate;


    do {

        const letter =
            "ABCDEFGHIJ"[
                Math.floor(
                    Math.random() *
                    10
                )
            ];


        const number =
            Math.floor(
                Math.random() *
                9000
            ) +
            1000;


        coordinate =
            `${letter}-${number}`;


    } while (

        document.querySelector(
            `[data-coordinate="${coordinate}"]`
        )

    );


    return coordinate;

}



/* =========================================================
   새 낙서 위치 찾기
========================================================= */

function findSpace() {

    const messages =
        document.querySelectorAll(".message");


    let x = 5000;
    let y = 2500;


    for (
        let attempt = 0;
        attempt < 200;
        attempt++
    ) {

        x =
            400 +
            Math.random() *
            9000;


        if (
            Math.random() <
            .65
        ) {

            y =
                1700 +
                Math.random() *
                2700;

        }

        else {

            y =
                350 +
                Math.random() *
                4000;

        }


        let safe = true;


        messages.forEach(
            function(message) {

                const oldX =
                    parseFloat(
                        message.style.left
                    );


                const oldY =
                    parseFloat(
                        message.style.top
                    );


                if (
                    Math.abs(
                        x - oldX
                    ) <
                    300

                    &&

                    Math.abs(
                        y - oldY
                    ) <
                    150
                ) {

                    safe = false;

                }

            }
        );


        if (safe) {
            break;
        }

    }


    return {

        x: Math.round(x),

        y: Math.round(y)

    };

}



/* =========================================================
   실제 메시지 생성
========================================================= */

function createMessage(data) {

    const message =
        document.createElement("div");


    message.className =
        "message";


    if (
        data.font === "diphy"
    ) {

        message.classList.add("diphy");

    }

    else if (
        data.font === "dokdo"
    ) {

        message.classList.add("dokdo");

    }

    else {

        message.classList.add("pen");

    }


    message.dataset.name =
        data.name;


    message.dataset.coordinate =
        data.coordinate;


    message.dataset.rotation =
        data.rotation;


    message.style.left =
        data.x +
        "px";


    message.style.top =
        data.y +
        "px";


    message.style.transform =
        `rotate(${data.rotation}deg)`;


    message.innerHTML = `

        ${escapeHTML(
            data.text
        ).replace(
            /\n/g,
            "<br>"
        )}

        <small>
            #${escapeHTML(
                data.coordinate
            )}
        </small>

    `;


    wall.appendChild(message);


    return message;

}



/* =========================================================
   마음 남기기
========================================================= */

document
    .getElementById("submitMessage")
    .onclick =
    function() {

        const name =
            receiver.value.trim();


        const text =
            messageInput.value.trim();


        if (!name) {

            alert(
                "이름 또는 별명을 입력해주세요."
            );

            return;

        }


        if (!text) {

            alert(
                "마음을 적어주세요."
            );

            return;

        }


        const font =
            document.querySelector(
                'input[name="font"]:checked'
            ).value;


        const position =
            findSpace();


        const coordinate =
            makeCoordinate();


        const data = {

            name: name,

            text: text,

            font: font,

            coordinate: coordinate,

            x: position.x,

            y: position.y,

            rotation:
                Math.floor(
                    Math.random() *
                    15
                ) -
                7,

            createdAt:
                new Date()
                    .toISOString()

        };


        saveMessage(data);

        createMessage(data);


        writeModal.classList.remove("show");


        document
            .getElementById("newCoordinate")
            .innerText =
            "#" +
            coordinate;


        completeModal.dataset.coordinate =
            coordinate;


        completeModal.classList.add("show");


        receiver.value =
            "";


        messageInput.value =
            "";


        charCount.innerText =
            "0";


        updatePreview();

        updateHeartCount();

    };



/* =========================================================
   저장된 글 불러오기
========================================================= */

function loadMessages() {

    getMessages().forEach(
        function(message) {

            createMessage(message);

        }
    );

}



/* =========================================================
   검색
========================================================= */

document
    .getElementById("findBtn")
    .onclick =
    search;


searchInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            search();

        }

    }
);


function search() {

    const keyword =
        searchInput.value
            .trim()
            .toLowerCase()
            .replace(
                "#",
                ""
            );


    searchResult.innerHTML =
        "";


    if (!keyword) {

        searchResult.innerHTML =
            "<p>검색어를 입력해주세요.</p>";

        return;

    }


    let count = 0;


    document
        .querySelectorAll(".message")
        .forEach(
            function(message) {

                const name =
                    (
                        message.dataset.name ||
                        ""
                    )
                    .toLowerCase();


                const coordinate =
                    (
                        message.dataset.coordinate ||
                        ""
                    )
                    .toLowerCase();


                if (
                    name.includes(keyword)
                    ||
                    coordinate.includes(keyword)
                ) {

                    count++;


                    const item =
                        document.createElement("div");


                    item.className =
                        "result-item";


                    item.innerHTML = `

                        <strong>
                            ${escapeHTML(
                                message.dataset.name
                            )}
                        </strong>

                        &nbsp;

                        #${escapeHTML(
                            message.dataset.coordinate
                        )}

                    `;


                    item.onclick =
                    function() {

                        goToMessage(message);

                    };


                    searchResult.appendChild(item);

                }

            }
        );


    if (!count) {

        searchResult.innerHTML =
            "<p>아직 이 이름으로 남겨진 마음이 없어요.</p>";

    }

}



/* =========================================================
   해당 메시지로 이동
========================================================= */

function goToMessage(message) {

    document
        .querySelectorAll(".modal")
        .forEach(
            function(modal) {

                modal.classList.remove("show");

            }
        );


    const x =
        parseFloat(
            message.style.left
        );


    const y =
        parseFloat(
            message.style.top
        );


    wallViewport.scrollTo({

        left:
            x *
            zoom -
            wallViewport.clientWidth /
            2 +
            150,

        top:
            y *
            zoom -
            wallViewport.clientHeight /
            2 +
            80,

        behavior:
            "smooth"

    });


    setTimeout(
        function() {

            message.classList.add("highlight");


            message.style.transform =
                "scale(1.5) rotate(0deg)";

        },
        600
    );


    setTimeout(
        function() {

            message.classList.remove("highlight");


            message.style.transform =
                `rotate(${
                    message.dataset.rotation
                }deg)`;

        },
        2600
    );

}



/* =========================================================
   작성 완료 → 내 글 찾기
========================================================= */

document
    .getElementById("goWall")
    .onclick =
    function() {

        const coordinate =
            completeModal.dataset.coordinate;


        const message =
            document.querySelector(
                `[data-coordinate="${coordinate}"]`
            );


        if (message) {

            goToMessage(message);

        }

    };



/* =========================================================
   좌표 복사
========================================================= */

document
    .getElementById("copyCoordinate")
    .onclick =
    function() {

        const text =
            document
                .getElementById("newCoordinate")
                .innerText;


        if (
            navigator.clipboard
        ) {

            navigator
                .clipboard
                .writeText(text);

        }


        alert(
            text +
            " 좌표가 복사되었습니다."
        );

    };



/* =========================================================
   광고
========================================================= */

const ads = {

    soju: {

        icon: "🍶",

        title: "오늘한잔",

        description:
            "오늘 하루도 수고한 당신에게. 마음벽과 함께하는 가상의 소주 브랜드입니다."

    },


    restaurant: {

        icon: "🥘",

        title: "골목식당",

        description:
            "따뜻한 한 끼와 이야기가 머무는 곳. 마음벽 브랜드 파트너입니다."

    },


    coffee: {

        icon: "☕",

        title: "하루커피",

        description:
            "잠시 쉬어가도 괜찮은 하루. 마음벽과 함께하는 가상의 카페 브랜드입니다."

    }

};


document
    .querySelectorAll(".ad-object")
    .forEach(
        function(ad) {

            ad.addEventListener(
                "mousedown",
                function(event) {

                    event.stopPropagation();

                }
            );


            ad.addEventListener(
                "click",
                function() {

                    const data =
                        ads[
                            this.dataset.ad
                        ];


                    if (!data) {
                        return;
                    }


                    document
                        .getElementById("adModalIcon")
                        .innerText =
                        data.icon;


                    document
                        .getElementById("adModalTitle")
                        .innerText =
                        data.title;


                    document
                        .getElementById("adModalDescription")
                        .innerText =
                        data.description;


                    adModal.classList.add("show");


                    recordAdClick(
                        this.dataset.ad
                    );

                }
            );

        }
    );



/* =========================================================
   광고 클릭 저장
========================================================= */

function recordAdClick(adName) {

    const key =
        "heartWallAdClicks";


    let clicks;


    try {

        clicks =
            JSON.parse(
                localStorage.getItem(key)
            ) ||
            {};

    }

    catch(error) {

        clicks = {};

    }


    clicks[adName] =
        (
            clicks[adName] ||
            0
        ) +
        1;


    localStorage.setItem(
        key,
        JSON.stringify(clicks)
    );

}


document
    .getElementById("adVisitBtn")
    .onclick =
    function() {

        alert(
            "실제 서비스에서는 광고주의 브랜드 페이지로 연결됩니다."
        );

    };



/* =========================================================
   마음 개수
========================================================= */

function updateHeartCount() {

    const basePeople =
        210;


    const messages =
        document.querySelectorAll(".message")
            .length;


    const total =
        basePeople +
        messages;


    heartCount.innerText =
        total.toLocaleString() +
        "개의 마음이 이 벽에 머물고 있습니다";

}



/* =========================================================
   HTML 보안 처리
========================================================= */

function escapeHTML(text) {

    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}



/* =========================================================
   시작
========================================================= */

/*
    약 200개의 기본 낙서 생성
*/

createGraffiti();


/*
    사용자가 이전에 작성했던 글 복원

    localStorage를 사용하기 때문에
    새로고침해도 그대로 남아있음.
*/

loadMessages();


/*
    UI 초기화
*/

updatePreview();

updatePosition();

updateHeartCount();


/*
    모든 변수 선언과 초기화가 끝난 다음
    마지막에 인트로 실행.

    이전 코드에서 있었던
    intro 변수 실행 순서 문제도 해결됨.
*/

playMemoryIntro();