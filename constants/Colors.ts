// 色彩検定クイズ用の色データ
export const colors3 = [
    { name: '桜色', hex: '#F6C6E5', pccs: 'p24+', munsell: '10RP 9/2.5', desc: '3級：桜色の説明' },
    { name: '青', hex: '#0000FF', pccs: 'b14', munsell: '5PB 5/12', desc: '3級：青の説明' },
    { name: '緑', hex: '#00FF00', pccs: 'g24', munsell: '5G 6/8', desc: '3級：緑の説明' },
];

export const colors2 = [
    { name: '黄色', hex: '#FFFF00', pccs: 'y14', munsell: '5Y 8/12', desc: '2級：黄色の説明' },
    { name: '紫', hex: '#800080', pccs: 'v6', munsell: '5P 3/8', desc: '2級：紫の説明' },
    { name: 'ピンク', hex: '#FFC0CB', pccs: 'p12', munsell: '5RP 8/4', desc: '2級：ピンクの説明' },
];

export const colors1 = [...colors2, ...colors3];
