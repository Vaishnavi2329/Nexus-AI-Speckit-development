// Bundle size optimization and code splitting utilities
import { analytics } from "./analytics";

export interface BundleAnalysis {
  totalSize: number;
  gzippedSize: number;
  chunks: ChunkInfo[];
  recommendations: string[];
  score: number;
}

export interface ChunkInfo {
  name: string;
  size: number;
  gzippedSize: number;
  modules: string[];
  isDynamic: boolean;
  isVendor: boolean;
}

export class BundleOptimizer {
  private static instance: BundleOptimizer;
  private bundleCache: Map<string, BundleAnalysis> = new Map();

  static getInstance(): BundleOptimizer {
    if (!BundleOptimizer.instance) {
      BundleOptimizer.instance = new BundleOptimizer();
    }
    return BundleOptimizer.instance;
  }

  // Analyze current bundle size
  async analyzeBundleSize(): Promise<BundleAnalysis> {
    const startTime = performance.now();
    
    try {
      // Simulate bundle analysis (in real app, this would analyze actual bundle)
      const mockChunks: ChunkInfo[] = [
        {
          name: 'main',
          size: 245760, // 240KB
          gzippedSize: 65536, // 64KB
          modules: ['react', 'react-dom', 'next', 'framer-motion', 'lucide-react'],
          isDynamic: false,
          isVendor: false
        },
        {
          name: 'vendor',
          size: 524288, // 512KB
          gzippedSize: 131072, // 128KB
          modules: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
          isDynamic: false,
          isVendor: true
        },
        {
          name: 'hero',
          size: 32768, // 32KB
          gzippedSize: 8192, // 8KB
          modules: ['@/components/sections/hero'],
          isDynamic: true,
          isVendor: false
        },
        {
          name: 'pricing',
          size: 49152, // 48KB
          gzippedSize: 12288, // 12KB
          modules: ['@/components/sections/pricing'],
          isDynamic: true,
          isVendor: false
        },
        {
          name: 'contact',
          size: 40960, // 40KB
          gzippedSize: 10240, // 10KB
          modules: ['@/components/sections/contact'],
          isDynamic: true,
          isVendor: false
        }
      ];

      const totalSize = mockChunks.reduce((sum, chunk) => sum + chunk.size, 0);
      const gzippedSize = mockChunks.reduce((sum, chunk) => sum + chunk.gzippedSize, 0);
      
      // Generate recommendations
      const recommendations = this.generateRecommendations(mockChunks, totalSize);
      
      // Calculate score
      const score = this.calculateBundleScore(totalSize, gzippedSize, mockChunks);
      
      const analysis: BundleAnalysis = {
        totalSize,
        gzippedSize,
        chunks: mockChunks,
        recommendations,
        score
      };

      const duration = performance.now() - startTime;
      
      // Track bundle analysis
      analytics.trackEvent('bundle_analysis', {
        totalSize,
        gzippedSize,
        chunkCount: mockChunks.length,
        score,
        duration
      });

      return analysis;
    } catch (error) {
      console.error('Bundle analysis failed:', error);
      throw error;
    }
  }

  // Generate optimization recommendations
  private generateRecommendations(chunks: ChunkInfo[], totalSize: number): string[] {
    const recommendations: string[] = [];
    
    // Check total bundle size
    if (totalSize > 1024 * 1024) { // > 1MB
      recommendations.push('Total bundle size exceeds 1MB. Consider code splitting and tree shaking.');
    }
    
    // Check for large chunks
    const largeChunks = chunks.filter(chunk => chunk.size > 300 * 1024); // > 300KB
    if (largeChunks.length > 0) {
      recommendations.push(`Large chunks detected: ${largeChunks.map(c => c.name).join(', ')}. Consider further splitting.`);
    }
    
    // Check for vendor chunk optimization
    const vendorChunk = chunks.find(chunk => chunk.isVendor);
    if (vendorChunk && vendorChunk.size > 500 * 1024) { // > 500KB
      recommendations.push('Vendor chunk is large. Consider splitting vendor dependencies.');
    }
    
    // Check for dynamic imports
    const dynamicChunks = chunks.filter(chunk => chunk.isDynamic);
    if (dynamicChunks.length === 0) {
      recommendations.push('No dynamic chunks found. Consider implementing code splitting for better performance.');
    }
    
    // Check for unused modules
    const allModules = chunks.flatMap(chunk => chunk.modules);
    const duplicateModules = this.findDuplicateModules(allModules);
    if (duplicateModules.length > 0) {
      recommendations.push(`Duplicate modules found: ${duplicateModules.join(', ')}. Consider deduplication.`);
    }
    
    // Compression recommendations
    const gzippedRatio = chunks.reduce((sum, chunk) => sum + chunk.gzippedSize, 0) / totalSize;
    if (gzippedRatio > 0.4) {
      recommendations.push('Gzip compression ratio is poor. Consider optimizing assets and code.');
    }
    
    return recommendations;
  }

  // Find duplicate modules across chunks
  private findDuplicateModules(modules: string[]): string[] {
    const moduleCount = new Map<string, number>();
    
    modules.forEach(module => {
      moduleCount.set(module, (moduleCount.get(module) || 0) + 1);
    });
    
    return Array.from(moduleCount.entries())
      .filter(([_, count]) => count > 1)
      .map(([module]) => module);
  }

  // Calculate bundle optimization score
  private calculateBundleScore(totalSize: number, gzippedSize: number, chunks: ChunkInfo[]): number {
    let score = 100;
    
    // Size penalty
    if (totalSize > 1024 * 1024) score -= 30; // > 1MB
    else if (totalSize > 512 * 1024) score -= 15; // > 512KB
    else if (totalSize > 256 * 1024) score -= 5; // > 256KB
    
    // Gzip ratio penalty
    const gzippedRatio = gzippedSize / totalSize;
    if (gzippedRatio > 0.5) score -= 20;
    else if (gzippedRatio > 0.4) score -= 10;
    else if (gzippedRatio > 0.3) score -= 5;
    
    // Chunk structure penalty
    const dynamicChunks = chunks.filter(chunk => chunk.isDynamic);
    if (dynamicChunks.length === 0) score -= 20;
    else if (dynamicChunks.length < 3) score -= 10;
    
    // Large chunk penalty
    const largeChunks = chunks.filter(chunk => chunk.size > 300 * 1024);
    if (largeChunks.length > 2) score -= 15;
    else if (largeChunks.length > 0) score -= 5;
    
    return Math.max(0, Math.min(100, score));
  }

  // Generate code splitting strategy
  generateCodeSplittingStrategy(): {
    strategy: string;
    chunks: Array<{
      name: string;
      modules: string[];
      priority: 'high' | 'medium' | 'low';
      lazy: boolean;
    }>;
  } {
    return {
      strategy: 'route-based + feature-based splitting',
      chunks: [
        {
          name: 'hero',
          modules: ['@/components/sections/hero'],
          priority: 'high',
          lazy: true
        },
        {
          name: 'problem',
          modules: ['@/components/sections/problem'],
          priority: 'high',
          lazy: true
        },
        {
          name: 'features',
          modules: ['@/components/sections/features'],
          priority: 'high',
          lazy: true
        },
        {
          name: 'testimonials',
          modules: ['@/components/sections/testimonials'],
          priority: 'medium',
          lazy: true
        },
        {
          name: 'how-it-works',
          modules: ['@/components/sections/how-it-works'],
          priority: 'medium',
          lazy: true
        },
        {
          name: 'integrations',
          modules: ['@/components/sections/integrations'],
          priority: 'medium',
          lazy: true
        },
        {
          name: 'demo',
          modules: ['@/components/sections/demo'],
          priority: 'medium',
          lazy: true
        },
        {
          name: 'pricing',
          modules: ['@/components/sections/pricing'],
          priority: 'high',
          lazy: true
        },
        {
          name: 'faq',
          modules: ['@/components/sections/faq'],
          priority: 'medium',
          lazy: true
        },
        {
          name: 'contact',
          modules: ['@/components/sections/contact'],
          priority: 'low',
          lazy: true
        },
        {
          name: 'ui-components',
          modules: ['@/components/ui/button', '@/components/ui/card', '@/components/ui/input'],
          priority: 'high',
          lazy: false
        },
        {
          name: 'vendor-react',
          modules: ['react', 'react-dom'],
          priority: 'high',
          lazy: false
        },
        {
          name: 'vendor-animations',
          modules: ['framer-motion'],
          priority: 'medium',
          lazy: true
        },
        {
          name: 'vendor-icons',
          modules: ['lucide-react'],
          priority: 'medium',
          lazy: true
        }
      ]
    };
  }

  // Generate tree shaking recommendations
  generateTreeShakingRecommendations(): string[] {
    return [
      'Remove unused imports and exports',
      'Use ES6 modules instead of CommonJS',
      'Avoid importing entire libraries when only specific functions are needed',
      'Use dynamic imports for conditional dependencies',
      'Configure webpack to eliminate dead code',
      'Use sideEffects: false in package.json for pure modules',
      'Avoid importing styles that are not used',
      'Use proper export/import syntax for tree shaking'
    ];
  }

  // Generate compression recommendations
  generateCompressionRecommendations(): string[] {
    return [
      'Enable gzip compression on server',
      'Use Brotli compression for better ratios',
      'Minify JavaScript, CSS, and HTML',
      'Optimize images with modern formats (WebP, AVIF)',
      'Use font subsetting to reduce font file sizes',
      'Remove unused CSS with tools like PurgeCSS',
      'Use SVG icons instead of icon fonts where possible',
      'Implement asset caching strategies'
    ];
  }

  // Create dynamic import wrapper
  createDynamicImport<T>(modulePath: string): () => Promise<T> {
    return () => import(modulePath) as Promise<T>;
  }

  // Preload critical chunks
  preloadCriticalChunks(): void {
    const criticalChunks = ['hero', 'problem', 'features'];
    
    criticalChunks.forEach(chunkName => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = `/static/chunks/${chunkName}.js`;
      document.head.appendChild(link);
    });
  }

  // Monitor bundle performance
  monitorBundlePerformance(): void {
    // Monitor chunk loading times
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name.includes('chunk')) {
          const resourceEntry = entry as PerformanceResourceTiming;
          analytics.trackEvent('chunk_load_time', {
            chunkName: entry.name,
            loadTime: entry.duration,
            size: resourceEntry.transferSize
          });
        }
      });
    });
    
    observer.observe({ entryTypes: ['resource'] });
  }

  // Generate bundle optimization report
  generateBundleReport(analysis: BundleAnalysis): string {
    const strategy = this.generateCodeSplittingStrategy();
    const treeShaking = this.generateTreeShakingRecommendations();
    const compression = this.generateCompressionRecommendations();
    
    return `
# Bundle Optimization Report

## Current Bundle Analysis
- **Total Size**: ${(analysis.totalSize / 1024).toFixed(2)} KB
- **Gzipped Size**: ${(analysis.gzippedSize / 1024).toFixed(2)} KB
- **Compression Ratio**: ${((analysis.gzippedSize / analysis.totalSize) * 100).toFixed(1)}%
- **Number of Chunks**: ${analysis.chunks.length}
- **Optimization Score**: ${analysis.score}/100

## Chunk Breakdown

${analysis.chunks.map(chunk => `
### ${chunk.name}
- **Size**: ${(chunk.size / 1024).toFixed(2)} KB
- **Gzipped**: ${(chunk.gzippedSize / 1024).toFixed(2)} KB
- **Type**: ${chunk.isDynamic ? 'Dynamic' : 'Static'} ${chunk.isVendor ? '(Vendor)' : ''}
- **Modules**: ${chunk.modules.length}
`).join('')}

## Recommendations

### Immediate Actions
${analysis.recommendations.map(rec => `- ${rec}`).join('\n')}

### Code Splitting Strategy
${strategy.chunks.map(chunk => `
- **${chunk.name}**: ${chunk.modules.length} modules (${chunk.priority} priority, ${chunk.lazy ? 'lazy' : 'eager'})
`).join('')}

### Tree Shaking
${treeShaking.map(rec => `- ${rec}`).join('\n')}

### Compression
${compression.map(rec => `- ${rec}`).join('\n')}

## Performance Targets
- **Total Bundle Size**: < 500KB (current: ${(analysis.totalSize / 1024).toFixed(2)}KB)
- **Gzipped Size**: < 150KB (current: ${(analysis.gzippedSize / 1024).toFixed(2)}KB)
- **Compression Ratio**: < 30% (current: ${((analysis.gzippedSize / analysis.totalSize) * 100).toFixed(1)}%)
- **Largest Chunk**: < 100KB (current: ${Math.max(...analysis.chunks.map(c => c.size)) / 1024}KB)

## Next Steps
1. Implement recommended code splitting
2. Enable tree shaking for unused code
3. Optimize compression settings
4. Monitor bundle size changes
5. Set up bundle size alerts in CI/CD
    `.trim();
  }
}

// Export singleton instance
export const bundleOptimizer = BundleOptimizer.getInstance();

// Export utility functions
export const analyzeBundle = () => bundleOptimizer.analyzeBundleSize();
export const getOptimizationStrategy = () => bundleOptimizer.generateCodeSplittingStrategy();
export const preloadChunks = () => bundleOptimizer.preloadCriticalChunks();
export const monitorPerformance = () => bundleOptimizer.monitorBundlePerformance();
