import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import PdfPageNumberControl from '@/features/pdf-preview/components/pdf-page-number-control'
import PdfZoomButtons from '@/features/pdf-preview/components/pdf-zoom-buttons'
import PdfZoomDropdown from '@/features/pdf-preview/components/pdf-zoom-dropdown'
import PdfRotationButtons from '@/features/pdf-preview/components/pdf-rotation-buttons'
import PdfViewerControlsMenuButton from '@/features/pdf-preview/components/pdf-viewer-controls-menu-button'
import { ScopeDecorator } from '../decorators/scope'

/**
 * Interactive wrapper that manages toolbar state (page, zoom, rotation)
 * and renders the full-width toolbar layout.
 */
function PdfToolbarFull() {
  const [page, setPage] = useState(1)
  const [rawScale, setRawScale] = useState(1)
  const [rotation, setRotation] = useState(0)

  const setZoom = (zoom: string) => {
    switch (zoom) {
      case 'zoom-in':
        setRawScale(prev => Math.min(prev * 1.25, 9.99))
        break
      case 'zoom-out':
        setRawScale(prev => Math.max(prev / 1.25, 0.1))
        break
      case 'page-width':
      case 'page-height':
        setRawScale(1)
        break
      default:
        setRawScale(Number(zoom) || 1)
    }
  }

  return (
    <div className="pdf">
      <div className="toolbar toolbar-pdf toolbar-pdf-hybrid btn-toolbar">
        <div
          className="toolbar-pdf-right"
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <div className="pdfjs-viewer-controls" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <PdfPageNumberControl
              setPage={setPage}
              page={page}
              totalPages={10}
            />
            <div className="pdfjs-zoom-controls">
              <PdfZoomButtons setZoom={setZoom} />
              <PdfZoomDropdown
                requestPresentationMode={() => {}}
                rawScale={rawScale}
                setZoom={setZoom}
              />
            </div>
            <PdfRotationButtons
              rotation={rotation}
              setRotation={setRotation}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 16, padding: 8, fontSize: 13, color: '#666' }}>
        Page: {page} | Zoom: {Math.round(rawScale * 100)}% | Rotation: {rotation}°
      </div>
    </div>
  )
}

/**
 * Interactive wrapper that renders the small/compact toolbar layout
 * with a popover menu button.
 */
function PdfToolbarSmall() {
  const [page, setPage] = useState(3)
  const [rawScale, setRawScale] = useState(1)
  const [rotation, setRotation] = useState(0)

  const setZoom = (zoom: string) => {
    switch (zoom) {
      case 'zoom-in':
        setRawScale(prev => Math.min(prev * 1.25, 9.99))
        break
      case 'zoom-out':
        setRawScale(prev => Math.max(prev / 1.25, 0.1))
        break
      default:
        setRawScale(Number(zoom) || 1)
    }
  }

  return (
    <div className="pdf">
      <div className="toolbar toolbar-pdf toolbar-pdf-hybrid btn-toolbar">
        <div
          className="toolbar-pdf-right"
          style={{ display: 'flex', alignItems: 'center', gap: 4, maxWidth: 200 }}
        >
          <div className="pdfjs-viewer-controls-small" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <PdfZoomDropdown
              requestPresentationMode={() => {}}
              rawScale={rawScale}
              setZoom={setZoom}
            />
            <PdfViewerControlsMenuButton
              setZoom={setZoom}
              setPage={setPage}
              page={page}
              totalPages={10}
              rotation={rotation}
              setRotation={setRotation}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 16, padding: 8, fontSize: 13, color: '#666' }}>
        Page: {page} | Zoom: {Math.round(rawScale * 100)}% | Rotation: {rotation}°
      </div>
    </div>
  )
}

/**
 * Isolated view of just the rotation buttons.
 */
function RotationButtonsOnly() {
  const [rotation, setRotation] = useState(0)

  return (
    <div className="pdf">
      <div className="toolbar toolbar-pdf toolbar-pdf-hybrid btn-toolbar">
        <div className="toolbar-pdf-right" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <PdfRotationButtons
            rotation={rotation}
            setRotation={setRotation}
          />
        </div>
      </div>
      <div style={{ marginTop: 16, padding: 8, fontSize: 13, color: '#666' }}>
        Rotation: {rotation}°
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Editor / Toolbar / PDF Viewer Controls',
  // @ts-ignore
  decorators: [ScopeDecorator],
}

export default meta

export const FullToolbar: StoryObj = {
  render: () => <PdfToolbarFull />,
}

export const SmallToolbar: StoryObj = {
  render: () => <PdfToolbarSmall />,
}

export const RotationButtons: StoryObj = {
  render: () => <RotationButtonsOnly />,
}
