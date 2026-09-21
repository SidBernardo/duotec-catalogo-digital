import arduinoUnoImg from '../assets/images/arduino_uno_real_1789024677881.jpg';
import arduinoNanoImg from '../assets/images/arduino_nano_real_1789024933072.jpg';
import arduinoMegaImg from '../assets/images/arduino_mega_real.jpg';
import esp32Img from '../assets/images/esp32_board_real_1789024773026.jpg';
import l298nImg from '../assets/images/l298n_driver_real_1789024882091.jpg';
import multimeterImg from '../assets/images/multimeter_digital_real_1789024832145.jpg';
import rfidModuleImg from '../assets/images/rfid_module_tag_1789026796773.jpg';
import hcsr04Img from '../assets/images/hcsr04_sensor_real_1789024741294.jpg';
import dht11Img from '../assets/images/dht11_sensor_real_1789024917957.jpg';
import mqGasImg from '../assets/images/mq_gas_sensor_1789026749134.jpg';
import dcMotorImg from '../assets/images/dc_motor_hobby_1789026687345.jpg';
import servoSg90Img from '../assets/images/servo_sg90_real_1789024802486.jpg';
import relay2chImg from '../assets/images/relay_2ch_real_1789024816766.jpg';
import batteryFanImg from '../assets/images/battery_fan_acc_1789026826218.jpg';
import displayLcdImg from '../assets/images/display_lcd1602_real_1789024787662.jpg';
import oled7segImg from '../assets/images/oled_7seg_display_1789026763826.jpg';
import buzzerAudioImg from '../assets/images/buzzer_speaker_1789026778328.jpg';
import icDip8Img from '../assets/images/ic_dip8_chip_real_1789024727032.jpg';
import voltageRegImg from '../assets/images/voltage_regulator_mod_1789026811173.jpg';
import transistorsImg from '../assets/images/transistors_diodes_1789026732899.jpg';
import ledsPackImg from '../assets/images/leds_pack_real_1789024693931.jpg';
import resistorsPackImg from '../assets/images/resistors_pack_real_1789024713278.jpg';
import capacitorsPackImg from '../assets/images/capacitors_pack_1789026718663.jpg';
import potentiometerImg from '../assets/images/potentiometer_real_1789024900886.jpg';
import switchButtonsImg from '../assets/images/switch_buttons_1789026702118.jpg';
import breadboard830Img from '../assets/images/breadboard_830_real_1789024754488.jpg';
import jumperWiresImg from '../assets/images/jumper_wires_real_1789024864756.jpg';
import solderingIronImg from '../assets/images/soldering_iron_real_1789024844649.jpg';
import keypad4x4Img from '../assets/images/keypad_4x4_real.jpg';
import peltierTileImg from '../assets/images/peltier_tile_real.jpg';
import pirSensorImg from '../assets/images/pir_sensor_real.jpg';
import bluetoothHc05Img from '../assets/images/bluetooth_hc05_real.jpg';
import soilMoistureImg from '../assets/images/soil_moisture_real.jpg';

export {
  arduinoUnoImg,
  arduinoNanoImg,
  arduinoMegaImg,
  esp32Img,
  l298nImg,
  multimeterImg,
  rfidModuleImg,
  hcsr04Img,
  dht11Img,
  mqGasImg,
  dcMotorImg,
  servoSg90Img,
  relay2chImg,
  batteryFanImg,
  displayLcdImg,
  oled7segImg,
  buzzerAudioImg,
  icDip8Img,
  voltageRegImg,
  transistorsImg,
  ledsPackImg,
  resistorsPackImg,
  capacitorsPackImg,
  potentiometerImg,
  switchButtonsImg,
  breadboard830Img,
  jumperWiresImg,
  solderingIronImg,
  keypad4x4Img,
  peltierTileImg,
  pirSensorImg,
  bluetoothHc05Img,
  soilMoistureImg,
};

// Helper para converter SVGs em Data URIs seguros e limpos
function createSvgDataUri(svgContent: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
}

// 1. Teclado Matricial 4x4 (Membrana com 16 teclas 1..D)
export const keypad4x4Svg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- Cabo Flat Inferior -->
  <path d="M120,240 L120,285 L180,285 L180,240 Z" fill="#94a3b8" />
  <line x1="128" y1="240" x2="128" y2="285" stroke="#475569" stroke-width="2"/>
  <line x1="136" y1="240" x2="136" y2="285" stroke="#475569" stroke-width="2"/>
  <line x1="144" y1="240" x2="144" y2="285" stroke="#475569" stroke-width="2"/>
  <line x1="152" y1="240" x2="152" y2="285" stroke="#475569" stroke-width="2"/>
  <line x1="160" y1="240" x2="160" y2="285" stroke="#475569" stroke-width="2"/>
  <line x1="168" y1="240" x2="168" y2="285" stroke="#475569" stroke-width="2"/>
  <line x1="174" y1="240" x2="174" y2="285" stroke="#475569" stroke-width="2"/>
  <!-- Corpo da Membrana -->
  <rect x="35" y="20" width="230" height="230" rx="16" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
  <rect x="45" y="28" width="210" height="214" rx="10" fill="#0f172a"/>
  <!-- Teclas 4x4 -->
  <!-- Linha 1: 1 2 3 A -->
  <rect x="58" y="40" width="38" height="38" rx="8" fill="#334155" stroke="#64748b" stroke-width="2"/>
  <text x="77" y="65" fill="#f8fafc" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle">1</text>
  <rect x="108" y="40" width="38" height="38" rx="8" fill="#334155" stroke="#64748b" stroke-width="2"/>
  <text x="127" y="65" fill="#f8fafc" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle">2</text>
  <rect x="158" y="40" width="38" height="38" rx="8" fill="#334155" stroke="#64748b" stroke-width="2"/>
  <text x="177" y="65" fill="#f8fafc" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle">3</text>
  <rect x="208" y="40" width="38" height="38" rx="8" fill="#dc2626" stroke="#ef4444" stroke-width="2"/>
  <text x="227" y="65" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle">A</text>
  <!-- Linha 2: 4 5 6 B -->
  <rect x="58" y="90" width="38" height="38" rx="8" fill="#334155" stroke="#64748b" stroke-width="2"/>
  <text x="77" y="115" fill="#f8fafc" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle">4</text>
  <rect x="108" y="90" width="38" height="38" rx="8" fill="#334155" stroke="#64748b" stroke-width="2"/>
  <text x="127" y="115" fill="#f8fafc" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle">5</text>
  <rect x="158" y="90" width="38" height="38" rx="8" fill="#334155" stroke="#64748b" stroke-width="2"/>
  <text x="177" y="115" fill="#f8fafc" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle">6</text>
  <rect x="208" y="90" width="38" height="38" rx="8" fill="#dc2626" stroke="#ef4444" stroke-width="2"/>
  <text x="227" y="115" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle">B</text>
  <!-- Linha 3: 7 8 9 C -->
  <rect x="58" y="140" width="38" height="38" rx="8" fill="#334155" stroke="#64748b" stroke-width="2"/>
  <text x="77" y="165" fill="#f8fafc" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle">7</text>
  <rect x="108" y="140" width="38" height="38" rx="8" fill="#334155" stroke="#64748b" stroke-width="2"/>
  <text x="127" y="165" fill="#f8fafc" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle">8</text>
  <rect x="158" y="140" width="38" height="38" rx="8" fill="#334155" stroke="#64748b" stroke-width="2"/>
  <text x="177" y="165" fill="#f8fafc" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle">9</text>
  <rect x="208" y="140" width="38" height="38" rx="8" fill="#dc2626" stroke="#ef4444" stroke-width="2"/>
  <text x="227" y="165" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle">C</text>
  <!-- Linha 4: * 0 # D -->
  <rect x="58" y="190" width="38" height="38" rx="8" fill="#2563eb" stroke="#60a5fa" stroke-width="2"/>
  <text x="77" y="217" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="20" text-anchor="middle">*</text>
  <rect x="108" y="190" width="38" height="38" rx="8" fill="#334155" stroke="#64748b" stroke-width="2"/>
  <text x="127" y="215" fill="#f8fafc" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle">0</text>
  <rect x="158" y="190" width="38" height="38" rx="8" fill="#2563eb" stroke="#60a5fa" stroke-width="2"/>
  <text x="177" y="215" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle">#</text>
  <rect x="208" y="190" width="38" height="38" rx="8" fill="#dc2626" stroke="#ef4444" stroke-width="2"/>
  <text x="227" y="215" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle">D</text>
</svg>`);

// 2. Pastilha Peltier TEC1-12706 (Cerâmica branca com fios vermelho e preto)
export const peltierTileSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f1f5f9"/>
  <!-- Fios vermelho e preto -->
  <path d="M70,180 C40,200 40,250 30,270" stroke="#ef4444" stroke-width="10" stroke-linecap="round" fill="none"/>
  <path d="M90,195 C60,215 55,265 45,285" stroke="#1e293b" stroke-width="10" stroke-linecap="round" fill="none"/>
  <!-- Sombra e Pastilha Cerâmica -->
  <rect x="68" y="58" width="170" height="170" rx="8" fill="#cbd5e1"/>
  <rect x="65" y="55" width="170" height="170" rx="6" fill="#ffffff" stroke="#e2e8f0" stroke-width="3"/>
  <!-- Borda de vedação interna de silicone -->
  <rect x="75" y="65" width="150" height="150" rx="4" fill="#fafafa" stroke="#f1f5f9" stroke-width="2"/>
  <!-- Inscrição Técnica -->
  <text x="150" y="130" fill="#475569" font-family="monospace" font-weight="bold" font-size="17" text-anchor="middle">TEC1-12706</text>
  <text x="150" y="155" fill="#64748b" font-family="sans-serif" font-weight="600" font-size="12" text-anchor="middle">TERMOELÉTRICO 12V 60W</text>
  <text x="150" y="175" fill="#94a3b8" font-family="sans-serif" font-size="10" text-anchor="middle">DUOTEC ANGOLA</text>
</svg>`);

// 3. Sensor PIR de Movimento HC-SR501 (PCB verde com domo fresnel branco)
export const pirSensorSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- Placa PCB Verde -->
  <rect x="40" y="45" width="220" height="210" rx="10" fill="#047857" stroke="#065f46" stroke-width="3"/>
  <!-- Furos de montagem -->
  <circle cx="58" cy="63" r="6" fill="#f8fafc" stroke="#d97706" stroke-width="2"/>
  <circle cx="242" cy="237" r="6" fill="#f8fafc" stroke="#d97706" stroke-width="2"/>
  <!-- Trimpots Laranja de Ajuste -->
  <rect x="55" y="180" width="26" height="26" rx="4" fill="#ea580c" stroke="#c2410c" stroke-width="2"/>
  <circle cx="68" cy="193" r="7" fill="#f97316"/>
  <line x1="64" y1="193" x2="72" y2="193" stroke="#fff" stroke-width="2"/>
  <rect x="90" y="180" width="26" height="26" rx="4" fill="#ea580c" stroke="#c2410c" stroke-width="2"/>
  <circle cx="103" cy="193" r="7" fill="#f97316"/>
  <line x1="99" y1="193" x2="107" y2="193" stroke="#fff" stroke-width="2"/>
  <!-- Pinos de Cabeçalho -->
  <rect x="220" y="175" width="20" height="40" fill="#1e293b"/>
  <circle cx="230" cy="183" r="3" fill="#e2e8f0"/>
  <circle cx="230" cy="195" r="3" fill="#e2e8f0"/>
  <circle cx="230" cy="207" r="3" fill="#e2e8f0"/>
  <!-- Domo Branco Fresnel PIR -->
  <circle cx="150" cy="125" r="68" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2"/>
  <circle cx="150" cy="125" r="64" fill="#ffffff"/>
  <!-- Grelha do Domo Fresnel -->
  <path d="M110,125 Q150,85 190,125 Q150,165 110,125 Z" fill="none" stroke="#e2e8f0" stroke-width="2"/>
  <circle cx="150" cy="125" r="45" fill="none" stroke="#f1f5f9" stroke-width="2"/>
  <circle cx="150" cy="125" r="25" fill="none" stroke="#e2e8f0" stroke-width="2"/>
  <text x="150" y="240" fill="#ecfdf5" font-family="sans-serif" font-weight="bold" font-size="11" text-anchor="middle">HC-SR501 PIR SENSOR</text>
</svg>`);

// 4. Sensor de Humidade do Solo (Higrômetro com garfos dourados condutivos)
export const soilMoistureSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- PCB da Sonda -->
  <rect x="90" y="30" width="120" height="80" rx="8" fill="#1e3a8a"/>
  <!-- Conector 2 Pinos -->
  <rect x="130" y="15" width="40" height="20" fill="#334155"/>
  <circle cx="140" cy="25" r="3" fill="#cbd5e1"/>
  <circle cx="160" cy="25" r="3" fill="#cbd5e1"/>
  <text x="150" y="75" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">SOIL SENSOR</text>
  <!-- Hastes / Garfos de Medição no Solo -->
  <path d="M105,110 L105,250 Q105,270 120,270 L130,270 Q140,270 140,250 L140,110 Z" fill="#047857"/>
  <path d="M160,110 L160,250 Q160,270 170,270 L180,270 Q195,270 195,250 L195,110 Z" fill="#047857"/>
  <!-- Pistas Douradas Condutivas -->
  <rect x="115" y="125" width="15" height="120" rx="4" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>
  <rect x="170" y="125" width="15" height="120" rx="4" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>
</svg>`);

// 5. Sensor de Chama Infravermelho (PCB azul com fotodíodo preto receptor)
export const flameSensorSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- PCB Azul -->
  <rect x="65" y="70" width="170" height="180" rx="10" fill="#1d4ed8" stroke="#1e40af" stroke-width="3"/>
  <!-- Fotodíodo Sensor de Chama na ponta -->
  <path d="M135,70 L135,35 Q135,15 150,15 Q165,15 165,35 L165,70 Z" fill="#0f172a" stroke="#334155" stroke-width="2"/>
  <ellipse cx="150" cy="30" rx="8" ry="12" fill="#1e293b"/>
  <!-- Trimpot Azul de Sensibilidade -->
  <rect x="120" y="110" width="60" height="50" rx="6" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
  <circle cx="150" cy="135" r="14" fill="#38bdf8"/>
  <line x1="140" y1="135" x2="160" y2="135" stroke="#ffffff" stroke-width="3"/>
  <!-- LEDs Indicadores -->
  <circle cx="95" cy="115" r="6" fill="#ef4444"/>
  <circle cx="95" cy="140" r="6" fill="#22c55e"/>
  <!-- 4 Pinos Conexão -->
  <rect x="100" y="240" width="100" height="20" fill="#1e293b"/>
  <line x1="115" y1="250" x2="115" y2="280" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
  <line x1="138" y1="250" x2="138" y2="280" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
  <line x1="162" y1="250" x2="162" y2="280" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
  <line x1="185" y1="250" x2="185" y2="280" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
  <text x="150" y="210" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="11" text-anchor="middle">FLAME SENSOR IV</text>
</svg>`);

// 6. Sensor de Corrente ACS712 (PCB azul com borne de parafuso verde)
export const currentSensorSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- PCB Azul -->
  <rect x="50" y="70" width="200" height="170" rx="10" fill="#1d4ed8"/>
  <!-- Borne Verde de Parafusos para Carga -->
  <rect x="55" y="95" width="65" height="120" rx="8" fill="#15803d" stroke="#166534" stroke-width="2"/>
  <circle cx="87" cy="125" r="12" fill="#22c55e" stroke="#14532d" stroke-width="2"/>
  <line x1="80" y1="125" x2="94" y2="125" stroke="#fff" stroke-width="3"/>
  <circle cx="87" cy="185" r="12" fill="#22c55e" stroke="#14532d" stroke-width="2"/>
  <line x1="80" y1="185" x2="94" y2="185" stroke="#fff" stroke-width="3"/>
  <!-- Chip Hall Effect ACS712 -->
  <rect x="145" y="115" width="65" height="50" rx="4" fill="#0f172a"/>
  <text x="177" y="145" fill="#f8fafc" font-family="sans-serif" font-weight="bold" font-size="10" text-anchor="middle">ACS712</text>
  <!-- Pinos de Saída (VCC, OUT, GND) -->
  <line x1="240" y1="120" x2="275" y2="120" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
  <line x1="240" y1="155" x2="275" y2="155" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
  <line x1="240" y1="190" x2="275" y2="190" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
  <text x="175" y="215" fill="#93c5fd" font-family="sans-serif" font-weight="bold" font-size="11" text-anchor="middle">CORRENTE 20A/30A</text>
</svg>`);

// 7. Sensor de Tensão AC ZMPT101B (Transformador azul na PCB)
export const voltageSensorSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <rect x="50" y="60" width="200" height="180" rx="10" fill="#0284c7"/>
  <!-- Borne de Entrada AC -->
  <rect x="55" y="90" width="50" height="100" rx="6" fill="#15803d"/>
  <circle cx="80" cy="115" r="10" fill="#22c55e"/>
  <circle cx="80" cy="165" r="10" fill="#22c55e"/>
  <!-- Transformador ZMPT101B -->
  <rect x="125" y="80" width="100" height="85" rx="8" fill="#1e40af" stroke="#1d4ed8" stroke-width="3"/>
  <text x="175" y="125" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">ZMPT101B</text>
  <text x="175" y="145" fill="#93c5fd" font-family="sans-serif" font-size="9" text-anchor="middle">TRANSFORMADOR</text>
  <!-- Trimpot Calibração -->
  <rect x="140" y="185" width="45" height="35" rx="4" fill="#3b82f6"/>
  <circle cx="162" cy="202" r="8" fill="#60a5fa"/>
</svg>`);

// 8. Fluxímetro YF-S201 (Sensor de Fluxo de Água com turbina preta)
export const waterFlowSensorSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- Tubos Rosqueados Entrada/Saída -->
  <rect x="25" y="125" width="70" height="50" rx="4" fill="#334155" stroke="#1e293b" stroke-width="3"/>
  <line x1="45" y1="125" x2="45" y2="175" stroke="#64748b" stroke-width="4"/>
  <line x1="65" y1="125" x2="65" y2="175" stroke="#64748b" stroke-width="4"/>
  <rect x="205" y="125" width="70" height="50" rx="4" fill="#334155" stroke="#1e293b" stroke-width="3"/>
  <line x1="225" y1="125" x2="225" y2="175" stroke="#64748b" stroke-width="4"/>
  <line x1="245" y1="125" x2="245" y2="175" stroke="#64748b" stroke-width="4"/>
  <!-- Câmara Circular da Turbina -->
  <circle cx="150" cy="150" r="75" fill="#0f172a" stroke="#334155" stroke-width="5"/>
  <circle cx="150" cy="150" r="50" fill="#1e293b"/>
  <!-- Pás da Turbina Interna -->
  <path d="M150,150 L150,110 M150,150 L185,130 M150,150 L185,170 M150,150 L150,190 M150,150 L115,170 M150,150 L115,130" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
  <!-- Fios elétricos -->
  <path d="M150,75 Q150,40 180,30" stroke="#ef4444" stroke-width="4" fill="none"/>
  <path d="M150,75 Q160,40 200,35" stroke="#0f172a" stroke-width="4" fill="none"/>
  <path d="M150,75 Q170,40 220,40" stroke="#eab308" stroke-width="4" fill="none"/>
  <text x="150" y="250" fill="#0f172a" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">FLUXÍMETRO YF-S201</text>
</svg>`);

// 9. LDR 5mm (Fotorresistor com trilha sinuosa de sulfeto de cádmio)
export const ldrPhotoresistorSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- Terminais metálicos longos -->
  <line x1="125" y1="160" x2="125" y2="280" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
  <line x1="175" y1="160" x2="175" y2="280" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
  <!-- Cabeça Cerâmica Redonda -->
  <circle cx="150" cy="110" r="65" fill="#fed7aa" stroke="#fb923c" stroke-width="4"/>
  <circle cx="150" cy="110" r="55" fill="#ea580c"/>
  <!-- Trilha Sinuosa CdS Fotossensível -->
  <path d="M110,85 Q150,80 190,85 Q190,98 150,98 Q110,98 110,110 Q150,110 190,110 Q190,122 150,122 Q110,122 110,135 Q150,135 190,135" fill="none" stroke="#fed7aa" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Brilho de Luz Incidente -->
  <path d="M70,40 L95,65 M60,65 L85,90" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
  <text x="150" y="210" fill="#0f172a" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">FOTORRESISTOR LDR 5MM</text>
</svg>`);

// 10. Termistor NTC/PTC (Disco termistor azul com terminais radiais)
export const thermistorSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <line x1="130" y1="150" x2="130" y2="270" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
  <line x1="170" y1="150" x2="170" y2="270" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
  <!-- Disco de Cerâmica Epóxi Azul -->
  <circle cx="150" cy="105" r="55" fill="#0284c7" stroke="#0369a1" stroke-width="4"/>
  <ellipse cx="135" cy="90" rx="35" ry="25" fill="#38bdf8" opacity="0.4"/>
  <text x="150" y="112" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="14" text-anchor="middle">10k</text>
  <text x="150" y="128" fill="#e0f2fe" font-family="sans-serif" font-weight="bold" font-size="10" text-anchor="middle">NTC/PTC</text>
  <text x="150" y="200" fill="#475569" font-family="sans-serif" font-weight="bold" font-size="11" text-anchor="middle">TERMISTOR 10KΩ</text>
</svg>`);

// 11. Bateria 9V 6F22 e Clip de Conexão
export const battery9vSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- Terminais Snap Superior -->
  <rect x="110" y="30" width="26" height="15" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <circle cx="170" cy="38" r="12" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <!-- Corpo da Bateria 9V -->
  <rect x="90" y="45" width="120" height="210" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="3"/>
  <!-- Faixa Dourada / Cobre -->
  <rect x="90" y="120" width="120" height="60" fill="#eab308"/>
  <text x="150" y="160" fill="#0f172a" font-family="sans-serif" font-weight="900" font-size="28" text-anchor="middle">9V</text>
  <text x="150" y="100" fill="#f8fafc" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle">DUOTEC POWER</text>
  <text x="150" y="215" fill="#94a3b8" font-family="sans-serif" font-size="10" text-anchor="middle">6F22 HEAVY DUTY</text>
</svg>`);

// 12. Conector Clip de Bateria 9V
export const batteryClipSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- Fios Trançados Vermelho e Preto -->
  <path d="M125,180 C110,230 180,240 160,285" stroke="#ef4444" stroke-width="6" stroke-linecap="round" fill="none"/>
  <path d="M145,180 C130,230 200,240 180,285" stroke="#1e293b" stroke-width="6" stroke-linecap="round" fill="none"/>
  <!-- Cabeça Plástica do Conector Clip -->
  <rect x="75" y="60" width="150" height="120" rx="16" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
  <!-- Botões de Encaixe de Pressão Snap -->
  <circle cx="115" cy="120" r="22" fill="#cbd5e1" stroke="#64748b" stroke-width="3"/>
  <circle cx="115" cy="120" r="12" fill="#94a3b8"/>
  <rect x="165" y="102" width="36" height="36" rx="6" fill="#cbd5e1" stroke="#64748b" stroke-width="3"/>
  <text x="150" y="220" fill="#0f172a" font-family="sans-serif" font-weight="bold" font-size="11" text-anchor="middle">CLIP CONECTOR 9V</text>
</svg>`);

// 13. Regulador de Tensão TO-220 (LM7805 / LM7812 / LM317)
export const to220RegulatorSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- Aba Metálica Traseira de Dissipação com Furo -->
  <rect x="100" y="30" width="100" height="70" rx="6" fill="#94a3b8" stroke="#64748b" stroke-width="2"/>
  <circle cx="150" cy="65" r="14" fill="#f8fafc" stroke="#475569" stroke-width="2"/>
  <!-- Corpo Plástico Preto TO-220 -->
  <rect x="85" y="90" width="130" height="95" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="3"/>
  <text x="150" y="140" fill="#f8fafc" font-family="monospace" font-weight="900" font-size="18" text-anchor="middle">LM7805</text>
  <text x="150" y="165" fill="#94a3b8" font-family="sans-serif" font-weight="600" font-size="10" text-anchor="middle">+5V 1.5A TO-220</text>
  <!-- 3 Pinos Longos Metálicos (IN, GND, OUT) -->
  <line x1="110" y1="185" x2="110" y2="280" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round"/>
  <line x1="150" y1="185" x2="150" y2="280" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round"/>
  <line x1="190" y1="185" x2="190" y2="280" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round"/>
</svg>`);

// 14. Transístor TO-92 (BC547, BC548, 2N2222, LM35)
export const to92TransistorSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- 3 Terminais Metálicos (C, B, E) -->
  <line x1="115" y1="160" x2="115" y2="280" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
  <line x1="150" y1="160" x2="150" y2="280" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
  <line x1="185" y1="160" x2="185" y2="280" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
  <!-- Corpo Preto formato D TO-92 -->
  <path d="M90,70 L210,70 L210,120 Q210,165 150,165 Q90,165 90,120 Z" fill="#0f172a" stroke="#1e293b" stroke-width="3"/>
  <text x="150" y="115" fill="#f8fafc" font-family="monospace" font-weight="bold" font-size="14" text-anchor="middle">BC547 / 2N2222</text>
  <text x="150" y="135" fill="#94a3b8" font-family="sans-serif" font-size="10" text-anchor="middle">TO-92 PACKAGE</text>
</svg>`);

// 15. Diodo 1N4007 (Cilindro preto com faixa prateada de cátodo)
export const diode1n4007Svg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- Terminais axiais -->
  <line x1="20" y1="150" x2="280" y2="150" stroke="#94a3b8" stroke-width="7" stroke-linecap="round"/>
  <!-- Corpo Preto do Diodo -->
  <rect x="80" y="110" width="140" height="80" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
  <!-- Faixa Prateada Cátodo -->
  <rect x="95" y="110" width="22" height="80" fill="#e2e8f0"/>
  <text x="165" y="155" fill="#ffffff" font-family="monospace" font-weight="900" font-size="18" text-anchor="middle">1N4007</text>
  <text x="150" y="225" fill="#475569" font-family="sans-serif" font-weight="bold" font-size="11" text-anchor="middle">DIODO RETIFICADOR 1A 1000V</text>
</svg>`);

// 16. Display 7 Segmentos (Módulo LED vermelho)
export const sevenSegmentSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- Bloco Preto do Módulo -->
  <rect x="80" y="40" width="140" height="220" rx="8" fill="#0f172a" stroke="#1e293b" stroke-width="4"/>
  <!-- Segmentos '8.' em Vermelho Aceso -->
  <!-- A: topo -->
  <polygon points="105,65 195,65 185,75 115,75" fill="#ef4444"/>
  <!-- B: topo dir -->
  <polygon points="198,70 198,140 188,135 188,80" fill="#ef4444"/>
  <!-- C: baixo dir -->
  <polygon points="198,160 198,230 188,220 188,165" fill="#ef4444"/>
  <!-- D: base -->
  <polygon points="105,235 195,235 185,225 115,225" fill="#ef4444"/>
  <!-- E: baixo esq -->
  <polygon points="102,160 102,230 112,220 112,165" fill="#ef4444"/>
  <!-- F: topo esq -->
  <polygon points="102,70 102,140 112,135 112,80" fill="#ef4444"/>
  <!-- G: centro -->
  <polygon points="105,150 195,150 185,156 115,156" fill="#ef4444"/>
  <!-- Ponto Decimal DP -->
  <circle cx="205" cy="235" r="7" fill="#ef4444"/>
</svg>`);

// 17. Arduino Mega 2560 (Placa azul maior com ATmega2560)
export const arduinoMegaSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- PCB Azul Longa do Mega -->
  <rect x="30" y="50" width="240" height="200" rx="10" fill="#0284c7" stroke="#0369a1" stroke-width="3"/>
  <!-- Conector USB Metálico -->
  <rect x="25" y="70" width="40" height="35" rx="3" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
  <!-- Jack DC de Alimentação Preto -->
  <rect x="25" y="160" width="45" height="40" rx="4" fill="#0f172a"/>
  <!-- Chip Central ATmega2560 Quadrado TQFP -->
  <rect x="125" y="115" width="50" height="50" rx="3" fill="#0f172a" stroke="#d97706" stroke-width="2"/>
  <circle cx="132" cy="122" r="2" fill="#fff"/>
  <!-- Linhas de Barramentos Duplos Digitais -->
  <rect x="240" y="70" width="20" height="155" fill="#0f172a"/>
  <rect x="80" y="55" width="145" height="12" fill="#0f172a"/>
  <rect x="80" y="233" width="145" height="12" fill="#0f172a"/>
  <text x="150" y="195" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="13" text-anchor="middle">ARDUINO MEGA 2560</text>
  <text x="150" y="210" fill="#bae6fd" font-family="sans-serif" font-size="9" text-anchor="middle">54 PINOS I/O R3</text>
</svg>`);

// 18. Ethernet Shield W5100 (Shield com porta RJ45)
export const ethernetShieldSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- PCB Azul -->
  <rect x="45" y="50" width="210" height="200" rx="10" fill="#0284c7" stroke="#0369a1" stroke-width="3"/>
  <!-- Porta RJ45 Metálica Ethernet -->
  <rect x="35" y="80" width="60" height="60" rx="4" fill="#94a3b8" stroke="#475569" stroke-width="3"/>
  <rect x="30" y="95" width="30" height="30" rx="2" fill="#0f172a"/>
  <!-- Slot Micro-SD -->
  <rect x="180" y="55" width="45" height="40" rx="3" fill="#cbd5e1"/>
  <!-- Chip W5100 -->
  <rect x="120" y="130" width="55" height="55" rx="3" fill="#0f172a"/>
  <text x="147" y="160" fill="#38bdf8" font-family="sans-serif" font-weight="bold" font-size="10" text-anchor="middle">W5100</text>
  <text x="150" y="225" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">ETHERNET SHIELD</text>
</svg>`);

// 19. Sensor Óptico de Impressão Digital AS608
export const fingerprintSensorSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- Corpo Metálico do Scanner -->
  <rect x="80" y="45" width="140" height="210" rx="14" fill="#1e293b" stroke="#0f172a" stroke-width="4"/>
  <!-- Vidro / Prisma Óptico com Luz Azul -->
  <rect x="95" y="60" width="110" height="120" rx="8" fill="#0284c7" stroke="#38bdf8" stroke-width="3"/>
  <!-- Desenho da Impressão Digital -->
  <path d="M150,90 Q170,90 170,110 Q170,140 140,150 M150,105 Q160,105 160,120 M135,115 Q135,100 150,100 M125,125 Q125,90 150,75 Q185,90 185,125" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
  <text x="150" y="215" fill="#38bdf8" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">AS608 ÓPTICO</text>
  <text x="150" y="235" fill="#94a3b8" font-family="sans-serif" font-size="9" text-anchor="middle">LEITOR BIOMÉTRICO</text>
</svg>`);

// 20. Oxímetro e Batimentos Cardíacos MAX30100
export const max30100Svg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- PCB Roxo / Verde -->
  <rect x="70" y="70" width="160" height="160" rx="10" fill="#7c3aed" stroke="#6d28d9" stroke-width="3"/>
  <!-- Sensor Óptico Central com LEDs Vermelho e Infravermelho -->
  <rect x="110" y="110" width="80" height="60" rx="4" fill="#0f172a" stroke="#d97706" stroke-width="2"/>
  <circle cx="135" cy="140" r="8" fill="#ef4444"/>
  <circle cx="165" cy="140" r="8" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
  <!-- Pinos I2C -->
  <circle cx="85" cy="90" r="4" fill="#fbbf24"/>
  <circle cx="85" cy="115" r="4" fill="#fbbf24"/>
  <circle cx="85" cy="140" r="4" fill="#fbbf24"/>
  <circle cx="85" cy="165" r="4" fill="#fbbf24"/>
  <circle cx="85" cy="190" r="4" fill="#fbbf24"/>
  <text x="150" y="205" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="11" text-anchor="middle">MAX30100 OXÍMETRO</text>
</svg>`);

// 21. Sensor de Turbidez SEN0189 / Condutividade TDS
export const turbidityTdsSensorSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- Placa Adaptadora Azul -->
  <rect x="50" y="50" width="110" height="110" rx="8" fill="#0284c7"/>
  <circle cx="105" cy="105" r="18" fill="#0369a1"/>
  <!-- Cabo para a Sonda -->
  <path d="M160,105 C200,105 200,180 210,210" stroke="#0f172a" stroke-width="6" fill="none"/>
  <!-- Sonda Preta Imersível -->
  <rect x="185" y="180" width="50" height="85" rx="10" fill="#0f172a" stroke="#334155" stroke-width="2"/>
  <rect x="195" y="240" width="30" height="20" rx="2" fill="#38bdf8"/>
  <text x="150" y="280" fill="#0f172a" font-family="sans-serif" font-weight="bold" font-size="11" text-anchor="middle">SENSOR DE ÁGUA / TDS / TURBIDEZ</text>
</svg>`);

// 22. Sensor de Toque Capacitivo TTP223 (Placa vermelha compacta)
export const touchSensorTtp223Svg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- Placa Vermelha -->
  <rect x="80" y="60" width="140" height="180" rx="12" fill="#dc2626" stroke="#b91c1c" stroke-width="3"/>
  <!-- Área de Toque Circular -->
  <circle cx="150" cy="130" r="42" fill="#ef4444" stroke="#fca5a5" stroke-width="3"/>
  <!-- Ícone de Dedo / Toque -->
  <path d="M142,110 L142,135 Q142,148 152,148 Q162,148 162,135 L162,120" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
  <!-- 3 Pinos Dourados -->
  <circle cx="120" cy="210" r="5" fill="#fbbf24"/>
  <circle cx="150" cy="210" r="5" fill="#fbbf24"/>
  <circle cx="180" cy="210" r="5" fill="#fbbf24"/>
  <text x="150" y="95" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="13" text-anchor="middle">TOUCH TTP223</text>
</svg>`);

// 23. Diodo Laser 9mm com Corpo de Latão
export const laserDiodeSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- Fios vermelho e azul -->
  <path d="M70,145 L20,135" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>
  <path d="M70,155 L20,165" stroke="#2563eb" stroke-width="6" stroke-linecap="round"/>
  <!-- Corpo de Latão Dourado Cilindrico -->
  <rect x="70" y="120" width="150" height="60" rx="6" fill="#d97706" stroke="#b45309" stroke-width="3"/>
  <rect x="70" y="130" width="150" height="40" fill="#fbbf24"/>
  <!-- Lente Frontal -->
  <rect x="220" y="125" width="20" height="50" rx="3" fill="#1e293b"/>
  <!-- Feixe Vermelho Laser -->
  <polygon points="240,150 290,140 290,160" fill="#ef4444" opacity="0.8"/>
  <text x="150" y="215" fill="#0f172a" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">MÓDULO LASER 5V 650NM</text>
</svg>`);

// 24. Microfone de Eletreto 9mm (Cápsula de alumínio prateada)
export const electretMicSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- Terminais metálicos inferiores -->
  <line x1="130" y1="180" x2="130" y2="265" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
  <line x1="170" y1="180" x2="170" y2="265" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
  <!-- Cápsula Cilindrica de Alumínio Prateada -->
  <circle cx="150" cy="115" r="65" fill="#cbd5e1" stroke="#64748b" stroke-width="4"/>
  <!-- Feltro Preto Acústico Interno com Furos -->
  <circle cx="150" cy="115" r="45" fill="#1e293b"/>
  <circle cx="150" cy="115" r="6" fill="#0f172a"/>
  <circle cx="130" cy="115" r="4" fill="#0f172a"/>
  <circle cx="170" cy="115" r="4" fill="#0f172a"/>
  <circle cx="150" cy="95" r="4" fill="#0f172a"/>
  <circle cx="150" cy="135" r="4" fill="#0f172a"/>
  <text x="150" y="210" fill="#0f172a" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">MIC DE ELETRETO</text>
</svg>`);

// 25. Trimpot Multivoltas Cermet 100K Azul
export const trimpotSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- 3 Pinos Metálicos -->
  <line x1="110" y1="180" x2="110" y2="270" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
  <line x1="150" y1="180" x2="150" y2="270" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
  <line x1="190" y1="180" x2="190" y2="270" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
  <!-- Corpo Azul Retangular Cermet -->
  <rect x="75" y="70" width="150" height="110" rx="8" fill="#1d4ed8" stroke="#1e40af" stroke-width="3"/>
  <!-- Parafuso de Latão para Ajuste com Fenda -->
  <circle cx="110" cy="95" r="14" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
  <line x1="102" y1="95" x2="118" y2="95" stroke="#78350f" stroke-width="3"/>
  <text x="155" y="145" fill="#ffffff" font-family="monospace" font-weight="bold" font-size="16" text-anchor="middle">W104 (100k)</text>
  <text x="150" y="215" fill="#475569" font-family="sans-serif" font-weight="bold" font-size="11" text-anchor="middle">TRIMPOT MULTIVOLTAS</text>
</svg>`);

// 26. Módulo Relé 1 Canal 5V
export const relay1chSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <rect x="60" y="55" width="180" height="190" rx="10" fill="#0284c7" stroke="#0369a1" stroke-width="3"/>
  <!-- Borne de Saída Verde 3 Parafusos (NO, COM, NC) -->
  <rect x="65" y="75" width="45" height="130" rx="6" fill="#15803d"/>
  <circle cx="87" cy="95" r="8" fill="#22c55e"/>
  <circle cx="87" cy="140" r="8" fill="#22c55e"/>
  <circle cx="87" cy="185" r="8" fill="#22c55e"/>
  <!-- Cubo Azul do Relé Songle 5V -->
  <rect x="120" y="75" width="110" height="105" rx="6" fill="#1e40af" stroke="#1d4ed8" stroke-width="2"/>
  <text x="175" y="115" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">SRD-05VDC</text>
  <text x="175" y="135" fill="#93c5fd" font-family="sans-serif" font-weight="bold" font-size="9" text-anchor="middle">10A 250VAC</text>
  <text x="175" y="155" fill="#60a5fa" font-family="sans-serif" font-size="8" text-anchor="middle">SONGLE RELAY</text>
  <!-- Pinos Entrada (VCC, GND, IN) -->
  <rect x="140" y="225" width="60" height="15" fill="#1e293b"/>
  <circle cx="150" cy="232" r="3" fill="#cbd5e1"/>
  <circle cx="170" cy="232" r="3" fill="#cbd5e1"/>
  <circle cx="190" cy="232" r="3" fill="#cbd5e1"/>
</svg>`);

// 27. Módulo Relé 4 Canais 5V
export const relay4chSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <rect x="40" y="45" width="220" height="210" rx="10" fill="#0284c7" stroke="#0369a1" stroke-width="3"/>
  <!-- 4 Relés Azuis Alinhados -->
  <rect x="50" y="55" width="46" height="110" rx="4" fill="#1e40af"/>
  <rect x="102" y="55" width="46" height="110" rx="4" fill="#1e40af"/>
  <rect x="154" y="55" width="46" height="110" rx="4" fill="#1e40af"/>
  <rect x="206" y="55" width="46" height="110" rx="4" fill="#1e40af"/>
  <text x="150" y="200" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">MÓDULO RELÉ 4 CANAIS 5V</text>
  <text x="150" y="220" fill="#bae6fd" font-family="sans-serif" font-size="10" text-anchor="middle">COM OPTOACOPLADORES</text>
</svg>`);

// 28. Módulo Bluetooth HC-05
export const bluetoothHc05Svg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- PCB Azul Base -->
  <rect x="75" y="40" width="150" height="220" rx="10" fill="#1d4ed8" stroke="#1e40af" stroke-width="3"/>
  <!-- Placa Filha Verde Bluetooth com Antena Serpenteada -->
  <rect x="85" y="50" width="130" height="120" rx="6" fill="#047857"/>
  <!-- Antena PCB Dourada -->
  <path d="M100,60 L200,60 L200,75 L115,75 L115,90 L200,90" fill="none" stroke="#fbbf24" stroke-width="3"/>
  <!-- Chip CSR -->
  <rect x="125" y="110" width="50" height="45" rx="3" fill="#0f172a"/>
  <!-- Botão de Pareamento / Modo AT -->
  <circle cx="100" cy="190" r="10" fill="#ea580c"/>
  <text x="150" y="195" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="14" text-anchor="middle">HC-05</text>
  <text x="150" y="215" fill="#93c5fd" font-family="sans-serif" font-size="9" text-anchor="middle">BLUETOOTH SERIAL</text>
  <!-- 6 Pinos Inferiores -->
  <rect x="85" y="245" width="130" height="15" fill="#1e293b"/>
</svg>`);

// 29. Rolo de Solda Estanho/Chumbo para Electrónica
export const solderSpoolSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <!-- Carretel Plástico Azul com Miolo de Fio Metálico -->
  <ellipse cx="150" cy="90" rx="90" ry="35" fill="#0284c7" stroke="#0369a1" stroke-width="3"/>
  <rect x="60" y="90" width="180" height="110" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
  <!-- Espiras do Fio de Estanho Brilhante -->
  <line x1="60" y1="105" x2="240" y2="105" stroke="#f8fafc" stroke-width="4"/>
  <line x1="60" y1="120" x2="240" y2="120" stroke="#f1f5f9" stroke-width="4"/>
  <line x1="60" y1="135" x2="240" y2="135" stroke="#f8fafc" stroke-width="4"/>
  <line x1="60" y1="150" x2="240" y2="150" stroke="#f1f5f9" stroke-width="4"/>
  <line x1="60" y1="165" x2="240" y2="165" stroke="#f8fafc" stroke-width="4"/>
  <line x1="60" y1="180" x2="240" y2="180" stroke="#f8fafc" stroke-width="4"/>
  <ellipse cx="150" cy="200" rx="90" ry="35" fill="#0284c7" stroke="#0369a1" stroke-width="3"/>
  <!-- Etiqueta do Rolo -->
  <rect x="90" y="115" width="120" height="60" rx="4" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  <text x="150" y="140" fill="#0f172a" font-family="sans-serif" font-weight="900" font-size="12" text-anchor="middle">ESTANHO 60/40</text>
  <text x="150" y="158" fill="#2563eb" font-family="sans-serif" font-weight="bold" font-size="10" text-anchor="middle">ROLO SOLDA 0.8MM</text>
  <!-- Fio de Solda Solto Desenrolado -->
  <path d="M240,150 Q270,170 270,220" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" fill="none"/>
</svg>`);

// 30. Fio Flexível de 1.50mm² em Rolo
export const wireSpoolSvg = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <rect width="300" height="300" fill="#f8fafc"/>
  <ellipse cx="150" cy="100" rx="90" ry="35" fill="#dc2626" stroke="#b91c1c" stroke-width="3"/>
  <rect x="60" y="100" width="180" height="100" fill="#ef4444"/>
  <line x1="60" y1="115" x2="240" y2="115" stroke="#f87171" stroke-width="4"/>
  <line x1="60" y1="135" x2="240" y2="135" stroke="#f87171" stroke-width="4"/>
  <line x1="60" y1="155" x2="240" y2="155" stroke="#f87171" stroke-width="4"/>
  <line x1="60" y1="175" x2="240" y2="175" stroke="#f87171" stroke-width="4"/>
  <ellipse cx="150" cy="200" rx="90" ry="35" fill="#dc2626" stroke="#b91c1c" stroke-width="3"/>
  <ellipse cx="150" cy="100" rx="35" ry="14" fill="#f8fafc"/>
  <text x="150" y="155" fill="#ffffff" font-family="sans-serif" font-weight="900" font-size="13" text-anchor="middle">FIO FLEXÍVEL 1.50mm²</text>
</svg>`);

// Mapeamento Definitivo e Autêntico para cada Componente do Catálogo DUOTEC
export function resolveComponentImage(productName: string, categoryId?: string, currentImage?: string): string {
  // Se o utilizador carregou uma imagem personalizada (base64 ou URL externa direta), mantê-la!
  if (currentImage && (currentImage.startsWith('data:image/') || currentImage.startsWith('http://') || currentImage.startsWith('https://'))) {
    if (!currentImage.includes('svg+xml')) {
      return currentImage;
    }
  }

  const name = productName.toUpperCase();

  // 1. PLACAS & MICROCONTROLADORES
  if (name.includes('MEGA 2560')) return arduinoMegaImg;
  if (name.includes('ETHERNET SHIELD')) return arduinoUnoImg;
  if (name.includes('ARDUINO NANO') || name.includes('NANO')) return arduinoNanoImg;
  if (name.includes('ESP32') || name.includes('NODE') || name.includes('ESP-32')) return esp32Img;
  if (name.includes('ARDUINO UNO') || name.includes('UNO ATM328') || name.includes('ATMEGA328')) return arduinoUnoImg;

  // 2. MOTORES, DRIVERS & ATUADORES
  if (name.includes('SERVO') || name.includes('SG90') || name.includes('MG995')) return servoSg90Img;
  if (name.includes('L298N') || name.includes('PONTE H') || name.includes('DRIVER MOTOR')) return l298nImg;
  if (name.includes('MOTOR DC 2 EIXOS') || name.includes('MOTOR DC')) return dcMotorImg;
  if (name.includes('COOLER') || name.includes('VENTILADOR')) return batteryFanImg;
  if (name.includes('PELTIER') || name.includes('TEC1-12706')) return peltierTileImg;
  if (name.includes('RELÉ 4C') || name.includes('4 CANAIS') || name.includes('4C')) return relay2chImg;
  if (name.includes('RELÉ 2C') || name.includes('2 CANAIS') || name.includes('2C')) return relay2chImg;
  if (name.includes('RELÉ 1C') || name.includes('1 CANAL') || name.includes('RELÉ 5V')) return relay2chImg;
  if (name.includes('ESTADO SOLIDO') || name.includes('SSR')) return relay2chImg;

  // 3. MÓDULOS DE COMUNICAÇÃO & IOT
  if (name.includes('RFID') || name.includes('RC522')) return rfidModuleImg;
  if (name.includes('HC-05') || name.includes('BLUETOOTH')) return bluetoothHc05Img;
  if (name.includes('GSM') || name.includes('A9G') || name.includes('GPS')) return rfidModuleImg;

  // 4. SENSORES & MEDIÇÃO
  if (name.includes('TECLADO MATRICIAL') || name.includes('4X4')) return keypad4x4Img;
  if (name.includes('HC-SR04') || name.includes('JSN') || name.includes('ULTRASSONICO')) return hcsr04Img;
  if (name.includes('DHT11') || name.includes('DHT-11') || name.includes('HUMIDADE E TEMP')) return dht11Img;
  if (name.includes('MQ-2') || name.includes('MQ-6') || name.includes('MQ-135') || name.includes('SENSOR GAS')) return mqGasImg;
  if (name.includes('HC-SR501') || name.includes('MOVIMENTO PIR') || name.includes('PIR')) return pirSensorImg;
  if (name.includes('UMIDADE DE SOLO') || name.includes('HIGRÔMETRO') || name.includes('HIGROMETRO') || name.includes('SOLO')) return soilMoistureImg;
  if (name.includes('CHAMA') || name.includes('FLAME') || name.includes('FOGO')) return flameSensorSvg;
  if (name.includes('FLUXÍMETRO') || name.includes('YF-S201') || name.includes('FLUXO')) return waterFlowSensorSvg;
  if (name.includes('ACS712') || name.includes('CORRENTE') || name.includes('SCT-013')) return currentSensorSvg;
  if (name.includes('ZMPT101') || name.includes('TENSAO') || name.includes('VOLTÍMETRO')) return voltageSensorSvg;
  if (name.includes('AS608') || name.includes('BIOMÉTRICO') || name.includes('FINGERPRINT')) return fingerprintSensorSvg;
  if (name.includes('MAX 30100') || name.includes('OXÍMETRO') || name.includes('BATIMENTO')) return max30100Svg;
  if (name.includes('PH METER') || name.includes('TURBIDEZ') || name.includes('TDS')) return turbidityTdsSensorSvg;
  if (name.includes('TTP223') || name.includes('TOQUE') || name.includes('TOUCH')) return touchSensorTtp223Svg;
  if (name.includes('LDR') || name.includes('FOTORRESISTOR') || name.includes('FOTOCÉLULA')) return ldrPhotoresistorSvg;
  if (name.includes('NTC') || name.includes('PTC') || name.includes('TERMISTOR')) return thermistorSvg;
  if (name.includes('MIC DE ELETRETO') || name.includes('ELETRETO') || name.includes('MICROFONE')) return buzzerAudioImg;
  if (name.includes('TCS3200') || name.includes('SENSOR DE COR')) return rfidModuleImg;
  if (name.includes('INDUTIVO') || name.includes('PROXIMIDADE')) return turbidityTdsSensorSvg;
  if (name.includes('DS18B20') || name.includes('LM35')) return transistorsImg;

  // 5. DISPLAYS, SINALIZAÇÃO & ÁUDIO
  if (name.includes('LCD 20X4') || name.includes('LCD 16X2') || name.includes('LCD')) return displayLcdImg;
  if (name.includes('OLED') || name.includes('128X64')) return oled7segImg;
  if (name.includes('7SEG') || name.includes('7 SEG')) return oled7segImg;
  if (name.includes('BUZZER') || name.includes('PIEZELÉTRICO') || name.includes('ALTO-FALANTE')) return buzzerAudioImg;
  if (name.includes('LASER')) return laserDiodeSvg;
  if (name.includes('LED')) return ledsPackImg;

  // 6. CIRCUITOS INTEGRADOS (CIs)
  if (
    name.includes('74LS') ||
    name.includes('74HC') ||
    name.includes('74HCT') ||
    name.includes('CD40') ||
    name.includes('NE 555') ||
    name.includes('NE555') ||
    name.includes('LM393') ||
    name.includes('LM3915') ||
    name.includes('LM358') ||
    name.includes('AMPOP')
  ) {
    return icDip8Img;
  }

  // 7. REGULADORES & ALIMENTAÇÃO
  if (name.includes('BATERIA 9V')) return batteryFanImg;
  if (name.includes('CONECTOR BATERIA') || name.includes('CLIP BATERIA')) return batteryClipSvg;
  if (name.includes('LM317') || name.includes('LM78') || name.includes('LM79')) return voltageRegImg;
  if (name.includes('LM-2596') || name.includes('LM2596') || name.includes('STEP-DOWN') || name.includes('STEP DOWN')) {
    return voltageRegImg;
  }

  // 8. SEMICONDUTORES (Diodos & Transístores)
  if (name.includes('DIODO 4007') || name.includes('1N4007')) return transistorsImg;
  if (name.includes('ZENER')) return transistorsImg;
  if (name.includes('IRFZ44N') || name.includes('TIP120') || name.includes('TIP31')) return transistorsImg;
  if (name.includes('2N2222') || name.includes('548') || name.includes('547') || name.includes('BC547') || name.includes('BC548')) {
    return transistorsImg;
  }
  if (name.includes('INFRAVERMELHO') || name.includes('TRANSISTOR')) return transistorsImg;

  // 9. PASSIVOS, RESISTORES & CHAVES
  if (name.includes('TRIMPOT')) return trimpotSvg;
  if (name.includes('POTENCIOMETRO') || name.includes('POTENCIÔMETRO') || name.includes('CAPA DE POTENCIOMETRO')) {
    return potentiometerImg;
  }
  if (name.includes('PUSH BUTTON') || name.includes('SWITCH') || name.includes('CHAVE')) return switchButtonsImg;
  if (name.includes('RESISTOR')) return resistorsPackImg;
  if (name.includes('CAPACITOR')) return capacitorsPackImg;

  // 10. PROTOTIPAGEM, SOLDAGEM & INSTRUMENTAÇÃO
  if (name.includes('MULTÍMETRO') || name.includes('MULTIMETRO')) return multimeterImg;
  if (name.includes('PLACA DE ENSAIO') || name.includes('BREADBOARD')) return breadboard830Img;
  if (name.includes('JUMPER') || name.includes('CABO DUPONT')) return jumperWiresImg;
  if (name.includes('FIO FLEXIVEL') || name.includes('FIO FLEXÍVEL')) return wireSpoolSvg;
  if (name.includes('ROLO DE SOLDA') || name.includes('ESTANHO')) return solderSpoolSvg;
  if (name.includes('FERRO DE SOLDA')) return solderingIronImg;

  // Fallback baseado na Categoria
  if (categoryId === 'placas-micro') return arduinoUnoImg;
  if (categoryId === 'modulos-comunicacao') return rfidModuleImg;
  if (categoryId === 'sensores') return dht11Img;
  if (categoryId === 'motores-reles-atuadores') return relay2chImg;
  if (categoryId === 'displays-sinalizacao') return displayLcdImg;
  if (categoryId === 'circuitos-integrados') return icDip8Img;
  if (categoryId === 'reguladores-alimentacao') return voltageRegImg;
  if (categoryId === 'semicondutores') return transistorsImg;
  if (categoryId === 'passivos-resistores-chaves') return resistorsPackImg;
  if (categoryId === 'prototipagem-solda') return breadboard830Img;

  return currentImage || breadboard830Img;
}
