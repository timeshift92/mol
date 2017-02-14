namespace $.$mol {
	
	export class $mol_plot_pane extends $.$mol_plot_pane {
		
		@ $mol_mem()
		dimensions() {
			const graphs = this.front()
			
			const next = [ [ 0 , 0 ] , [ 0 , 0 ] ]
			for( let graph of graphs ) {
				const dims = graph.dimensions()
				
				if( dims[ 0 ][ 0 ] < next[ 0 ][ 0 ] ) next[ 0 ][ 0 ] = dims[ 0 ][ 0 ]
				if( dims[ 0 ][ 1 ] < next[ 0 ][ 1 ] ) next[ 0 ][ 1 ] = dims[ 0 ][ 1 ]
				if( dims[ 1 ][ 0 ] > next[ 1 ][ 0 ] ) next[ 1 ][ 0 ] = dims[ 1 ][ 0 ]
				if( dims[ 1 ][ 1 ] > next[ 1 ][ 1 ] ) next[ 1 ][ 1 ] = dims[ 1 ][ 1 ]
			}
			
			return next
		}
		
		@ $mol_mem()
		size() {
			const dims = this.dimensions()
			return [
				dims[1][0] - dims[0][0] ,
				dims[1][1] - dims[0][1] ,
			]
		}
		
		view_box() {
			const dims = this.dimensions()

			const size = this.size()
			const gap = [0,0]//[ size[0] * .1 , size[1] * .1 ]

			const box = [
				[ dims[0][0] - gap[0] , dims[0][1] - gap[1] ] ,
				[ size[0] + 2 * gap[0] , size[1] + 2 * gap[1] ] ,
			]

			return box.map( point => point.join( ' ' ) ).join( ' ' )
		}
		
		hue_base() { return 140 }
		
		hue_shift() { return 50 }
		
		hue_graph( index : number ) {
			return ( 360 + this.hue_base() + this.hue_shift() * index ) % 360
		}
		
		@ $mol_mem()
		front_colored() {
			const graphs = this.front()
			
			graphs.forEach( ( graph , index ) => {
				graph.hue = () => this.hue_graph( index )
			} )
			
			return graphs
		}
		
	}

}
