import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "nepali",
})
export class NepaliPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const data = value
      .replace("0", "०")
      .replace("1", "१")
      .replace("2", "२")
      .replace("3", "३")
      .replace("4", "४")
      .replace("5", "५")
      .replace("6", "६")
      .replace("7", "७")
      .replace("8", "८")
      .replace("9", "९");

    return data;
  }
}
