interface Imagesete {
  name: string;
  file: string;
  images: Image[];
  width: number;
  height: number;
}

export type Imageset = Imagesete;

interface Image {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  offsetX?: number;
  offsetY?: number;
}

export type ImageAttr = Image;

class UIXMLParser {
  private debug: boolean = false;
  private skippedNodes: string[] = [];

  parse(xmlContent: string, enableDebug = false): Imagesete[] {
    this.debug = enableDebug;
    this.skippedNodes = [];

    const lines = xmlContent.split("\n");
    let currentLine = 0;

    const imagesets: Imagesete[] = [];

    while (currentLine < lines.length) {
      const line = lines[currentLine]!.trim();

      // Handle comments
      if (line.startsWith("<!--")) {
        currentLine++;
        continue;
      }

      // Handle Imageset tags
      if (line.includes("<Imageset")) {
        const Imagesete = this.parseImageset(lines, currentLine);
        if (Imagesete) {
          imagesets.push(Imagesete);
        } else {
          this.skippedNodes.push(`Line ${currentLine + 1}: ${line}`);
        }
      }

      currentLine++;
    }

    if (this.debug) {
      console.log(`Found ${imagesets.length} imagesets`);
      console.log(`Skipped ${this.skippedNodes.length} nodes:`);
      this.skippedNodes.forEach((node) => console.log(node));
    }

    return imagesets;
  }

  private parseImageset(lines: string[], startLine: number): Imagesete | null {
    const line = lines[startLine]!.trim();

    // Extract name and file attributes
    const nameMatch = line.match(/Name="([^"]+)"/);
    const fileMatch = line.match(/File="([^"]+)"/);

    if (!nameMatch || !fileMatch) return null;

    const imageset: Imagesete = {
      name: nameMatch[1]!,
      file: fileMatch[1]!,
      images: [],
      width: 0,
      height: 0,
    };

    // Handle self-closing tag
    if (line.endsWith("/>")) {
      return imageset;
    }

    // Parse images until find closing Imageset tag
    let currentLine = startLine + 1;
    while (currentLine < lines.length) {
      const currentLineContent = lines[currentLine]!.trim();

      if (currentLineContent.includes("</Imageset>")) {
        break;
      }

      if (currentLineContent.includes("<Image")) {
        const image = this.parseImage(currentLineContent);
        if (image) {
          imageset.images.push(image);
        }
      }

      currentLine++;
    }

    return imageset;
  }

  private parseImage(line: string): Image | null {
    const attrs = {
      name: line.match(/Name="([^"]+)"/)?.[1],
      x: parseInt(line.match(/X="(\d+)"/)?.[1] || ""),
      y: parseInt(line.match(/Y="(\d+)"/)?.[1] || ""),
      width: parseInt(line.match(/Width="(\d+)"/)?.[1] || ""),
      height: parseInt(line.match(/Height="(\d+)"/)?.[1] || ""),
      offsetX: parseInt(line.match(/OffsetX="(\d+)"/)?.[1] || ""),
      offsetY: parseInt(line.match(/OffsetY="(\d+)"/)?.[1] || ""),
    };

    if (
      !attrs.name ||
      isNaN(attrs.x) ||
      isNaN(attrs.y) ||
      isNaN(attrs.width) ||
      isNaN(attrs.height)
    ) {
      return null;
    }

    return {
      name: attrs.name,
      x: attrs.x,
      y: attrs.y,
      width: attrs.width,
      height: attrs.height,
      offsetX: isNaN(attrs.offsetX) ? undefined : attrs.offsetX,
      offsetY: isNaN(attrs.offsetY) ? undefined : attrs.offsetY,
    };
  }
}

export default UIXMLParser;
