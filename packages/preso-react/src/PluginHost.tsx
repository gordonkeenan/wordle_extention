import React, { useEffect, useRef } from 'react';
import type { PluginModule } from '@preso/core';

export interface PluginHostProps {
  plugin: PluginModule;
  props?: Record<string, any>;
}

export function PluginHost({ plugin, props = {} }: PluginHostProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize plugin if it has an init hook
    if (plugin.hooks?.init && containerRef.current) {
      plugin.hooks.init(containerRef.current, props);
    }

    // Cleanup on unmount
    return () => {
      if (plugin.hooks?.cleanup) {
        plugin.hooks.cleanup();
      }
    };
  }, [plugin, props]);

  return (
    <div ref={containerRef} className="preso-plugin-container" data-plugin={plugin.name}>
      {/* Plugin content will be injected here */}
    </div>
  );
}
