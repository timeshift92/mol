namespace $.$mol {
	
	export class $mol_grider extends $.$mol_grider {
		
		@ $mol_mem()
		childs() {
			const rowers = this.rowers()
			if( !rowers ) return null
			
			const viewWindow = this.viewWindow()
			
			return [].concat(
				this.header() ,
				( viewWindow.top > 0 ) ? this.gaperTop() : null ,
				rowers.slice( viewWindow.top , viewWindow.bottom ).valueOf() ,
				( viewWindow.bottom < viewWindow.count ) ? this.gaperBottom() : null ,
			)
		}
		
		@ $mol_mem()
		viewWindow() {
			const rowers = this.rowers()
			if( !rowers ) return null
			
			const count = rowers.length
			const context = this.context()
			const scrollTop = context.$mol_scroller_scrollTop()
			const heightLimit = context.$mol_viewer_heightLimit()
			const rowHeight = this.rowHeight()
			
			const top = Math.max( 0 , Math.floor( scrollTop / rowHeight ) - 2 )
			const bottom = Math.min( count , Math.ceil( heightLimit / rowHeight ) + 2 )
			
			return { top , bottom , count }
		}
		
		gapTop() {
			const viewWindow = this.viewWindow()
			return viewWindow.top * this.rowHeight()
		}
		
		gapBottom() {
			const viewWindow = this.viewWindow()
			return ( viewWindow.count - viewWindow.bottom ) * this.rowHeight()
		}
		
		@ $mol_mem()
		headerCellers() {
			return this.cols().map( colId => this.columnHeader( colId ) )
		}
		
		@ $mol_mem()
		columnTitle( colId : string ) {
			return colId
		}
		
		rowers() {
			return this.rows().map( ( row , index )=> this.rower( index ) )
		}
		
		cellers( rowId : number ) {
			return this.cols().map( colId => this.celler({ row : rowId , col : colId }) )
		}
		
		cellerContent( id : { row : number , col : string } ) {
			return [ this.rows()[ id.row ][ id.col ] ]
		}
		
		cols() {
			const rows = this.rows()
			if( !rows ) return []
			if( rows.length === 0 ) return []
			
			return Object.keys( rows[0] )
		}
		
	}
	
	export class $mol_grider_gaper extends $.$mol_grider_gaper {
		
		heightStyle() {
			return `${ this.height() }px`
		}
		
	}
	
	export class $mol_grider_rower extends $.$mol_grider_rower {
		
		heightStyle() {
			return `${ this.height() }px`
		}
		
	}
	
	export class $mol_app_grider_branch extends $.$mol_app_grider_branch {
		
		levelStyle() {
			return `${ this.level() *.75 - 1.5 }rem`
		}
		
		expandable() {
			return this.expanded() !== null
		}
		
	}
	
}