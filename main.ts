
/**
 * Custom Blocks for the MonkMakes Sensor for micro:bit
 */

/**
 * Custom blocks
 */
//% weight=100 
//% color=#f5c319 
//% icon="\uf121"
//% block="Coduck 传感器"
namespace CoduckSensor {

    /**
     * 以0到100之间的数字测量声级
     * @param pin 连接麦克风的引脚.
     */
    //% block="音量 s %p"
    export function soundLevel(pin: AnalogPin): number {
        let n = 1000
        let max = 0
        for (let i = 0; i < n; i++) {
            let value = Math.round((pins.analogReadPin(pin) - 511) / 5);
            if (value > 100) {
                value = 100;
            }
            if (value > max) {
                max = value;
            }
        }
        return max;
    }

    /**
     * 以摄氏度为单位测量温度
     * @param pin 温度传感器连接的引脚.
     */
    //% block="摄氏度 c %p"
    export function tempC(pin: AnalogPin): number {
        let R2 = 100000.0;
        let R25 = 100000.0;
        let B = 4275.0;
        let t0k = 273.15;
        let t0 = t0k + 25;

        let reading = pins.analogReadPin(pin);
        let vout = reading * 3.3 / 1023.0;
        let r = (R2 * (3.3 - vout)) / vout;
        let inv_t = 1.0 / t0 + (1.0 / B) * Math.log(r / R25);
        let t = (1.0 / inv_t) - t0k;
        return (Math.round(t));
    }

    /**
    * 以华氏度为单位测量温度
    * @param pin 温度传感器连接的引脚.
    */
    //% block="华氏度 f %p"
    export function tempF(pin: AnalogPin): number {
        let temp_c = tempC(pin);
        return (Math.round(temp_c * 9.0 / 5.0) + 32);
    }

    /**
     * 以0到100之间的数字测量亮度
     * @param pin 光传感器连接到的引脚.
     */
    //% block="亮度 l %p"
    export function lightLevel(pin: AnalogPin): number {
        let max_reading = 28;
        let value = Math.sqrt(pins.analogReadPin(pin)); // to compensate for inverse square indoor lack of sensitivity
        let light_level = Math.round(pins.map(value, 0, max_reading, 0, 100));
        if (light_level > 100) {
            light_level = 100;
        }
        return light_level;
    }

    /**
     * 温度传感器
     * 
     */
    //% block="温度值 t %p"
    export function TemperatureSensor(p: AnalogPin): number {
        let val: number = pins.analogReadPin(p);
        return val * 3100 / 1023 / 10;
    }
}
