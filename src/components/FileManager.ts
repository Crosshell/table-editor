export default class FileManager {
  save(data: string[][], filename: string) {
    const fileContent = data.map((row) => row.join('\t')).join('\n');

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  load(
    callback: (rowCount: number, colCount: number, data: string[][]) => void,
  ) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';

    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const content = reader.result as string;
            const lines = content.split('\n');

            const rowCount = lines.length;
            const colCount = lines[0]?.split('\t').length || 0;

            const data = lines.map((line) => line.split('\t'));

            callback(rowCount, colCount, data);
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        };
        reader.readAsText(file);
      }
    });

    input.click();
  }
}
