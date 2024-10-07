import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
const DrawingApp = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prevMouseX, setPrevMouseX] = useState<number>(0);
  const [prevMouseY, setPrevMouseY] = useState<number>(0);
  const [snapshot, setSnapshot] = useState<ImageData | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [selectedTool, setSelectedTool] = useState<string>('brush');
  const [brushWidth, setBrushWidth] = useState<number>(5);
  const [selectedColor, setSelectedColor] = useState<string>('#000');
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const setCanvasBackground = () => {
    if (ctx) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = selectedColor;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        setCtx(context);
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        setCanvasBackground();
      }
    }
  }, []);

  const getMousePos = (e: MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const drawRect = (e: MouseEvent) => {
    const { x, y } = getMousePos(e);
    if (ctx) {
      ctx.fillStyle = selectedColor;
      ctx.strokeStyle = selectedColor;
      if (!document.querySelector<HTMLInputElement>('#fill-color')?.checked) {
        ctx.strokeRect(x, y, prevMouseX - x, prevMouseY - y);
      } else {
        ctx.fillRect(x, y, prevMouseX - x, prevMouseY - y);
      }
    }
  };

  const drawCircle = (e: MouseEvent) => {
    const { x, y } = getMousePos(e);
    if (ctx) {
      let radius = Math.sqrt(Math.pow(prevMouseX - x, 2) + Math.pow(prevMouseY - y, 2));
      ctx.beginPath();
      ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
      document.querySelector<HTMLInputElement>('#fill-color')?.checked ? ctx.fill() : ctx.stroke();
    }
  };

  const drawTriangle = (e: MouseEvent) => {
    const { x, y } = getMousePos(e);
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(prevMouseX, prevMouseY);
      ctx.lineTo(x, y);
      ctx.lineTo(prevMouseX * 2 - x, y);
      ctx.closePath();
      document.querySelector<HTMLInputElement>('#fill-color')?.checked ? ctx.fill() : ctx.stroke();
    }
  };

  const startDraw = (e: MouseEvent) => {
    setIsDrawing(true);
    const { x, y } = getMousePos(e);
    setPrevMouseX(x);
    setPrevMouseY(y);
    if (ctx) {
      ctx.beginPath();
      ctx.lineWidth = brushWidth;
      ctx.strokeStyle = selectedColor;
      ctx.fillStyle = selectedColor;
      setSnapshot(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height));
    }
  };

  const drawing = (e: MouseEvent) => {
    if (!isDrawing || !ctx) return;
    if (snapshot) ctx.putImageData(snapshot, 0, 0);

    const { x, y } = getMousePos(e);

    if (selectedTool === 'brush' || selectedTool === 'eraser') {
      ctx.strokeStyle = selectedTool === 'eraser' ? '#fff' : selectedColor;
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (selectedTool === 'rectangle') {
      drawRect(e);
    } else if (selectedTool === 'circle') {
      drawCircle(e);
    } else {
      drawTriangle(e);
    }
  };

  const clearCanvas = () => {
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      setCanvasBackground();
    }
  };

  const saveImg = () => {
    const link = document.createElement('a');
    link.download = `${Date.now()}.jpg`;
    if (canvasRef.current) {
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <>
      <Head>
        <title>Design your Exoplanetary Art</title>
        <link rel="stylesheet" href="styles.css" />
      </Head>
      <h1 style={{ backgroundColor:'#87CEFA', color: 'black', textAlign: 'center',justifyContent: 'center', alignItems: 'center', fontSize: '30px', fontWeight: 'bold', marginTop: '20px' }}>Design your Exoplanetary Art</h1>
      <div className="container" style={{ backgroundColor: '#87CEFA' }}>
        <section className="tools-board">
          <div className="row">
            <label className="title">Shapes</label>
            <ul className="options">
              <li className="option tool" onClick={() => setSelectedTool('rectangle')}>
                <img src="icons/rectangle.svg" alt="" />
                <span>Rectangle</span>
              </li>
              <li className="option tool" onClick={() => setSelectedTool('circle')}>
                <img src="icons/circle.svg" alt="" />
                <span>Circle</span>
              </li>
              <li className="option tool" onClick={() => setSelectedTool('triangle')}>
                <img src="icons/triangle.svg" alt="" />
                <span>Triangle</span>
              </li>
              <li className="option">
                <input type="checkbox" id="fill-color" />
                <label htmlFor="fill-color">Fill color</label>
              </li>
            </ul>
          </div>
          <div className="row">
            <label className="title">Options</label>
            <ul className="options">
              <li className="option active tool" onClick={() => setSelectedTool('brush')}>
                <img src="icons/brush.svg" alt="" />
                <span>Brush</span>
              </li>
              <li className="option tool" onClick={() => setSelectedTool('eraser')}>
                <img src="icons/eraser.svg" alt="" />
                <span>Eraser</span>
              </li>
              <li className="option">
                <input
                  type="range"
                  id="size-slider"
                  min="1"
                  max="30"
                  value={brushWidth}
                  onChange={(e) => setBrushWidth(parseInt(e.target.value))}
                />
              </li>
            </ul>
          </div>
          <div className="row colors">
            <label className="title">Colors</label>
            <ul className="options">
              <li className="option" onClick={() => setSelectedColor('#fff')} style={{ backgroundColor: '#fff', border: '1px solid #bfbfbf' }}></li>
              <li className="option selected" onClick={() => setSelectedColor('#000')} style={{ backgroundColor: '#000' }}></li>
              <li className="option" onClick={() => setSelectedColor('#E02020')} style={{ backgroundColor: '#E02020' }}></li>
              <li className="option" onClick={() => setSelectedColor('#6DD400')} style={{ backgroundColor: '#6DD400' }}></li>
              <li className="option" onClick={() => setSelectedColor('#4A98F7')} style={{ backgroundColor: '#4A98F7' }}></li>
              <li className="option">
                <input
                  type="color"
                  id="color-picker"
                  value={selectedColor}
                  onChange={(e) => {
                    setSelectedColor(e.target.value);
                    e.target.parentElement.style.background = e.target.value;
                  }}
                />
              </li>
            </ul>
          </div>
          <div className="row buttons">
            <button className="clear-canvas" onClick={clearCanvas}>
              Clear Canvas
            </button>
            <button className="save-img" onClick={saveImg}>
              Save As Image
            </button>
          </div>
        </section>
        <section className="drawing-board">
          <canvas
            ref={canvasRef}
            onMouseDown={startDraw}
            onMouseMove={drawing}
            onMouseUp={() => setIsDrawing(false)}
            onMouseOut={() => setIsDrawing(false)}
          />
        </section>
        <style jsx>{`
          body{
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #0000FF;
          }
          .container {
            display: flex;
            background-color:#0000FF;
            width: 100%;
            height: 100%;
          }
          .tools-board {
            padding: 20px;
            margin-left: 10%;
            margin-top: 5%;
            margin-bottom: 5%;
            margin-right: 5%;
            border: 1px solid #bfbfbf;
            width: 200px;
            background-color: white;
            color: black;
          }
          .drawing-board {
            flex-grow: 1;
            position: relative;
            overflow: hidden;
          }
          canvas {
            border: 1px solid #bfbfbf;
            background-color: #fff;
            cursor: crosshair;
            width: 80%;
            height: 80%;
            margin-left: 10%;
            margin-top: 5%;
          }
          .row {
            margin-bottom: 20px;
          }
          .title {
            font-weight: bold;
            margin-bottom: 10px;
          }
          .options {
            list-style: none;
            padding: 0;
          }
          .option {
            margin-bottom: 5px;
            cursor: pointer;
          }
          .colors .option {
            width: 30px;
            height: 30px;
            display: inline-block;
            border: 1px solid #bfbfbf;
          }
          .clear-canvas,
          .save-img {
            margin-top: 10px;
            padding: 10px;
            background-color: #0070f3;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
        `}</style>
      </div>
      
      
    </>
  );
};

export default DrawingApp;

