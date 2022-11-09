# 🗾내손내맵
- 맵에서 원하는 곳을 찾고, 등록된 장소만을 취합해서 보여주는 지도 기록장
- 진행 기간: 2021.12, 2022.09 ~ 
- 주요 패키지: `next: 12.3.1`, `react: 18.2.0`, `typescript: 4.5.2`, `@emotion/styled: 11.6.0`, `axios: 0.24.0`
## 실행
### FE
`npm run dev`

### BE
`npm run json-server`
- root 디렉토리에 있는 `data.json`을 watch
```json
package.json
{
  "scripts": {
    "json-server": "json-server --watch data.json --port 4000"
  },
}
```

## 폴더 구조
```
naesonnaemap-user
├─ pages
│  ├─ _app.tsx                  # Layout, Head 설정
│  ├─ _document.tsx             # 카카오 SDK script load
│  ├─ index.tsx
│  ├─ main.tsx
│  └─ myPage.tsx
└─ src
   ├─ components
   │  ├─ Footer.tsx
   │  ├─ Header.tsx
   │  ├─ Layout.tsx
   │  ├─ Map.tsx                # main과 myPage에서 사용
   │  ├─ MyPlacesList.tsx       # myPage에 띄울 List 컴포넌트
   │  ├─ PlacesList.tsx         # main의 Map 위에 띄울 컴포넌트
   │  └─ SearchBar.tsx          # main 검색바
   ├─ hooks
   │  ├─ useCurrentLocation.ts  # 현재 위치 반환 hook
   │  └─ usePlaces.ts           # data fetch hook
   ├─ recoil
   │  └─ states.ts              # recoil 제거 중
   └─ styles
      └─ globalStyles.js
```
## 구현 사항
![ezgif com-gif-maker](https://user-images.githubusercontent.com/81501723/200850835-ae3f9574-fae4-4238-9fcf-92bd3bbeb729.gif)
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/81501723/200851264-f951644f-0b0c-4a12-8b50-08775db3e545.gif)


- [노션](https://www.notion.so/0ae498f43be743629339d64b026dc997)
